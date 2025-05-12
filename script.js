// Función para hashear contraseñas (implementación básica)
function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString();
}

// Inicializar cuenta de admin si no existe
function inicializarAdmin() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const adminExiste = usuarios.some(user => user.email === "admin@admin.com");
  
  if (!adminExiste) {
    const adminPassword = "admin";
    usuarios.push({
      name: "Administrador",
      email: "admin@admin.com",
      password: hashPassword(adminPassword)
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("Cuenta de administrador creada correctamente");
  }
}

// LOGIN
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("loginMessage");

  const tieneArroba = email.includes("@");
  const tienePunto = email.includes(".");

  if (!tieneArroba || !tienePunto) {
    mensaje.textContent = "Correo inválido ❌";
    mensaje.style.color = "red";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const hashedPassword = hashPassword(password);

  const usuarioEncontrado = usuarios.find(
    usuario => usuario.email === email && usuario.password === hashedPassword
  );

  if (usuarioEncontrado) {
    mostrarNotificacion(`Bienvenido/a, ${usuarioEncontrado.name}`, "success");
    actualizarNavegacion();
    navegarA('catalogo');

    // Guardar sesión activa
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    // Mostrar panel admin si el correo es del administrador
    if (usuarioEncontrado.email === "admin@admin.com") {
      mostrarPanelAdmin();
    }
  } else {
    mensaje.textContent = "Correo o contraseña incorrectos ❌";
    mensaje.style.color = "red";
  }
});

// Función para enviar email de verificación (simulada)
function enviarEmailVerificacion(email, codigo) {
  // En un entorno real, aquí se conectaría con un servicio de email
  console.log(`Email de verificación enviado a ${email} con código ${codigo}`);
  return true;
}

// Función para generar código de verificación
function generarCodigoVerificacion() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// REGISTRO
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const mensaje = document.getElementById("registerMessage");

  const tieneArroba = email.includes("@");
  const tienePunto = email.includes(".");

  if (!tieneArroba || !tienePunto) {
    mensaje.textContent = "Correo inválido ❌";
    mensaje.style.color = "red";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const yaExiste = usuarios.find(user => user.email === email);
  if (yaExiste) {
    mensaje.textContent = "Este correo ya está registrado 📧";
    mensaje.style.color = "orange";
    return;
  }

  const codigoVerificacion = generarCodigoVerificacion();
  const hashedPassword = hashPassword(password);
  
  // Guardar usuario pendiente de verificación
  const usuariosPendientes = JSON.parse(localStorage.getItem("usuariosPendientes")) || [];
  usuariosPendientes.push({
    name,
    email,
    password: hashedPassword,
    codigoVerificacion,
    fechaRegistro: new Date().toISOString()
  });
  localStorage.setItem("usuariosPendientes", JSON.stringify(usuariosPendientes));

  // Enviar email de verificación
  if (enviarEmailVerificacion(email, codigoVerificacion)) {
    mostrarNotificacion("Se ha enviado un código de verificación a tu correo electrónico.", "info");
    navegarA('verificacion');
  } else {
    mensaje.textContent = "Error al enviar el código de verificación ❌";
    mensaje.style.color = "red";
  }
});

// CATÁLOGO DE JUEGOS
const juegos = [
  {
    nombre: "Elden Ring",
    categoria: "RPG",
    plataforma: "PC",
    precio: 59.99,
    oferta: true,
    ventas: 150,
    valoracion: 4.8
  },
  {
    nombre: "God of War",
    categoria: "Acción",
    plataforma: "PlayStation",
    precio: 49.99,
    oferta: false,
    ventas: 200,
    valoracion: 4.9
  },
  {
    nombre: "Hollow Knight",
    categoria: "Metroidvania",
    plataforma: "PC",
    precio: 14.99,
    oferta: true,
    ventas: 300,
    valoracion: 4.7
  },
  {
    nombre: "The Legend of Zelda",
    categoria: "Aventura",
    plataforma: "Nintendo",
    precio: 69.99,
    oferta: false,
    ventas: 250,
    valoracion: 4.9
  }
];

function mostrarJuegos(lista) {
  const contenedor = document.getElementById("listaJuegos");
  contenedor.innerHTML = "";

  lista.forEach((juego, index) => {
    const card = document.createElement("div");
    card.classList.add("juego-card");
    card.innerHTML = `
      <h3>${juego.nombre}</h3>
      <p>Categoría: ${juego.categoria}</p>
      <p>Plataforma: ${juego.plataforma}</p>
      <p>Precio: $${juego.precio.toFixed(2)}</p>
      ${juego.oferta ? `<p class="oferta">🔥 En oferta</p>` : ""}
      <button onclick="agregarAlCarrito(${index})">Agregar al carrito 🛒</button>
    `;
    contenedor.appendChild(card);
  });
}

mostrarJuegos(juegos);
mostrarHistorial();

// FILTROS
document.getElementById("btnFiltrar").addEventListener("click", () => {
  const categoria = document.getElementById("filtroCategoria").value;
  const plataforma = document.getElementById("filtroPlataforma").value;
  const soloOferta = document.getElementById("filtroOferta").checked;
  const precioMax = parseFloat(document.getElementById("filtroPrecio").value);

  const filtrados = juegos.filter(juego => {
    return (
      (categoria === "" || juego.categoria === categoria) &&
      (plataforma === "" || juego.plataforma === plataforma) &&
      (!soloOferta || juego.oferta === true) &&
      (isNaN(precioMax) || juego.precio <= precioMax)
    );
  });

  mostrarJuegos(filtrados);
});

// CARRITO
let carrito = [];

function agregarAlCarrito(index) {
  const mensajePago = document.getElementById("mensajePago");
  mensajePago.textContent = "Agregando al carrito... 🛒";
  mensajePago.style.color = "var(--secondary-color)";
  
  setTimeout(() => {
    carrito.push(juegos[index]);
    actualizarCarrito();
    mensajePago.textContent = `${juegos[index].nombre} agregado al carrito ✅`;
    mensajePago.style.color = "green";
    
    // Ocultar mensaje después de 2 segundos
    setTimeout(() => {
      mensajePago.textContent = "";
    }, 2000);
  }, 500);
}

function actualizarCarrito() {
  const lista = document.getElementById("listaCarrito");
  const totalTexto = document.getElementById("totalCarrito");

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio.toFixed(2)}
      <button onclick="quitarDelCarrito(${index})">🗑️</button>
    `;
    lista.appendChild(li);
    total += item.precio;
  });

  totalTexto.textContent = `Total: $${total.toFixed(2)}`;
}

function quitarDelCarrito(index) {
  const mensajePago = document.getElementById("mensajePago");
  const juegoEliminado = carrito[index].nombre;
  
  mensajePago.textContent = "Eliminando del carrito... 🗑️";
  mensajePago.style.color = "var(--secondary-color)";
  
  setTimeout(() => {
    carrito.splice(index, 1);
    actualizarCarrito();
    mensajePago.textContent = `${juegoEliminado} eliminado del carrito ✅`;
    mensajePago.style.color = "green";
    
    // Ocultar mensaje después de 2 segundos
    setTimeout(() => {
      mensajePago.textContent = "";
    }, 2000);
  }, 500);
}

// PAGO CON RESUMEN
document.getElementById("btnPagar").addEventListener("click", () => {
  const mensajePago = document.getElementById("mensajePago");
  const btnPagar = document.getElementById("btnPagar");

  if (carrito.length === 0) {
    mensajePago.textContent = "El carrito está vacío ❌";
    mensajePago.style.color = "red";
    return;
  }

  // Deshabilitar botón y mostrar loading
  btnPagar.disabled = true;
  btnPagar.textContent = "Procesando pago...";
  mensajePago.textContent = "Procesando tu compra... 💳";
  mensajePago.style.color = "var(--secondary-color)";

  // Simular procesamiento de pago
  setTimeout(() => {
    // Generar resumen
    const numero = "ORD-" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const fecha = new Date().toLocaleString();
    let total = 0;

    const lista = document.getElementById("detalleCompra");
    lista.innerHTML = "";

    carrito.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
      lista.appendChild(li);
      total += item.precio;
    });

    document.getElementById("numeroOrden").textContent = numero;
    document.getElementById("fechaOrden").textContent = fecha;
    document.getElementById("totalPagado").textContent = total.toFixed(2);
    document.getElementById("resumenCompra").style.display = "block";

    // Limpiar carrito y actualizar
    carrito = [];
    actualizarCarrito();

    // Restaurar botón y mostrar mensaje de éxito
    btnPagar.disabled = false;
    btnPagar.textContent = "Pagar";
    mensajePago.textContent = "¡Gracias por tu compra! Aquí tienes tu resumen 🧾";
    mensajePago.style.color = "green";

    // Guardar en historial
    const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
    historial.push({
      numero,
      fecha,
      total: total.toFixed(2),
      juegos: carrito.map(j => j.nombre)
    });
    localStorage.setItem("historialCompras", JSON.stringify(historial));
    mostrarHistorial();
  }, 1500);
});

function mostrarHistorial() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
if (usuarioActivo && usuarioActivo.email === "admin@admin.com") {
  mostrarPanelAdmin();
}

  const listaHistorial = document.getElementById("listaHistorial");
  const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];

  listaHistorial.innerHTML = "";

  historial.forEach(orden => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${orden.numero}</strong> - ${orden.fecha} - $${orden.total}<br>
      Juegos: ${orden.juegos.join(", ")}
    `;
    listaHistorial.appendChild(li);
  });
}

function mostrarPanelAdmin() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuariosPendientes = JSON.parse(localStorage.getItem("usuariosPendientes")) || [];
  
  document.getElementById("totalUsuarios").textContent = usuarios.length;
  
  // Crear tabla de usuarios
  const tablaUsuarios = document.createElement('div');
  tablaUsuarios.className = 'admin-table-container';
  tablaUsuarios.innerHTML = `
    <h3><i class="fas fa-users"></i> Lista de Usuarios Registrados</h3>
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="listaUsuarios">
          ${usuarios.map(usuario => `
            <tr>
              <td>${usuario.name}</td>
              <td>${usuario.email}</td>
              <td><span class="badge success">Verificado</span></td>
              <td>
                <button onclick="eliminarUsuario('${usuario.email}')" class="btn-danger">
                  <i class="fas fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <h3><i class="fas fa-user-clock"></i> Usuarios Pendientes de Verificación</h3>
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Fecha Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="listaUsuariosPendientes">
          ${usuariosPendientes.map(usuario => `
            <tr>
              <td>${usuario.name}</td>
              <td>${usuario.email}</td>
              <td><span class="badge warning">Pendiente</span></td>
              <td>${new Date(usuario.fechaRegistro).toLocaleString()}</td>
              <td>
                <button onclick="verificarUsuario('${usuario.email}')" class="btn-success">
                  <i class="fas fa-check"></i> Verificar
                </button>
                <button onclick="eliminarUsuarioPendiente('${usuario.email}')" class="btn-danger">
                  <i class="fas fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Reemplazar el contenido del panel admin
  const panelAdmin = document.getElementById("panelAdmin");
  panelAdmin.innerHTML = `
    <h2><i class="fas fa-user-shield"></i> Panel de Administrador</h2>
    <div class="admin-stats">
      <p>Total de usuarios registrados: <strong id="totalUsuarios">${usuarios.length}</strong></p>
      <p>Usuarios pendientes de verificación: <strong>${usuariosPendientes.length}</strong></p>
    </div>
  `;
  panelAdmin.appendChild(tablaUsuarios);
  panelAdmin.style.display = "block";
}

// Función para eliminar usuario
function eliminarUsuario(email) {
  if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${email}?`)) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosActualizados = usuarios.filter(u => u.email !== email);
    localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
    mostrarNotificacion("Usuario eliminado correctamente", "success");
    mostrarPanelAdmin();
  }
}

// Función para eliminar usuario pendiente
function eliminarUsuarioPendiente(email) {
  if (confirm(`¿Estás seguro de que deseas eliminar al usuario pendiente ${email}?`)) {
    const usuariosPendientes = JSON.parse(localStorage.getItem("usuariosPendientes")) || [];
    const usuariosActualizados = usuariosPendientes.filter(u => u.email !== email);
    localStorage.setItem("usuariosPendientes", JSON.stringify(usuariosActualizados));
    mostrarNotificacion("Usuario pendiente eliminado correctamente", "success");
    mostrarPanelAdmin();
  }
}

// Función para verificar usuario manualmente
function verificarUsuario(email) {
  const usuariosPendientes = JSON.parse(localStorage.getItem("usuariosPendientes")) || [];
  const usuarioPendiente = usuariosPendientes.find(u => u.email === email);
  
  if (usuarioPendiente) {
    // Mover usuario a la lista de usuarios verificados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push({
      name: usuarioPendiente.name,
      email: usuarioPendiente.email,
      password: usuarioPendiente.password
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
    // Eliminar usuario pendiente
    const usuariosActualizados = usuariosPendientes.filter(u => u.email !== email);
    localStorage.setItem("usuariosPendientes", JSON.stringify(usuariosActualizados));
    
    mostrarNotificacion("Usuario verificado correctamente", "success");
    mostrarPanelAdmin();
  }
}

// Sistema de notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
  const notificacion = document.createElement('div');
  notificacion.className = `notificacion ${tipo}`;
  notificacion.textContent = mensaje;
  document.body.appendChild(notificacion);

  // Animar entrada
  setTimeout(() => {
    notificacion.style.opacity = '1';
    notificacion.style.transform = 'translateY(0)';
  }, 100);

  // Remover después de 3 segundos
  setTimeout(() => {
    notificacion.style.opacity = '0';
    notificacion.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      document.body.removeChild(notificacion);
    }, 300);
  }, 3000);
}

// Navegación entre secciones
function navegarA(seccionId) {
  const secciones = document.querySelectorAll('main > section');
  secciones.forEach(seccion => {
    seccion.style.display = 'none';
  });
  
  const seccionDestino = document.getElementById(seccionId);
  if (seccionDestino) {
    seccionDestino.style.display = 'block';
    seccionDestino.scrollIntoView({ behavior: 'smooth' });
  }
}

// Actualizar navegación según usuario
function actualizarNavegacion() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const navLinks = document.querySelector('.nav-links');
  
  if (usuarioActivo) {
    navLinks.innerHTML = `
      <a href="#masVendidos" onclick="navegarA('masVendidos')">Más Vendidos</a>
      <a href="#mejorValorados" onclick="navegarA('mejorValorados')">Mejor Valorados</a>
      <a href="#catalogo" onclick="navegarA('catalogo')">Catálogo</a>
      <a href="#carrito" onclick="navegarA('carrito')">Carrito</a>
      <a href="#historialCompras" onclick="navegarA('historialCompras')">Mis Compras</a>
      <div class="user-actions">
        <span>Bienvenido, ${usuarioActivo.name}</span>
        <button onclick="cerrarSesion()" class="btn-secondary">Cerrar Sesión</button>
      </div>
    `;
  } else {
    navLinks.innerHTML = `
      <a href="#masVendidos" onclick="navegarA('masVendidos')">Más Vendidos</a>
      <a href="#mejorValorados" onclick="navegarA('mejorValorados')">Mejor Valorados</a>
      <a href="#catalogo" onclick="navegarA('catalogo')">Catálogo</a>
      <a href="#carrito" onclick="navegarA('carrito')">Carrito</a>
      <a href="#historialCompras" onclick="navegarA('historialCompras')">Mis Compras</a>
      <div class="user-actions">
        <button onclick="navegarA('login')" class="btn-secondary">Iniciar Sesión</button>
        <button onclick="navegarA('register')" class="btn-primary">Registrarse</button>
      </div>
    `;
  }
}

// Función para reiniciar la cuenta de admin
function reiniciarCuentaAdmin() {
  // Limpiar usuarios existentes
  localStorage.removeItem("usuarios");
  localStorage.removeItem("usuariosPendientes");
  localStorage.removeItem("usuarioActivo");
  
  // Reinicializar admin
  inicializarAdmin();
  
  mostrarNotificacion("Cuenta de administrador reiniciada correctamente", "success");
}

// Modificar la inicialización para incluir la opción de reinicio
document.addEventListener('DOMContentLoaded', () => {
  // Agregar botón de reinicio en el panel admin si no existe
  const panelAdmin = document.getElementById("panelAdmin");
  if (panelAdmin) {
    const botonReinicio = document.createElement('button');
    botonReinicio.className = 'btn-danger';
    botonReinicio.innerHTML = '<i class="fas fa-sync"></i> Reiniciar Cuenta Admin';
    botonReinicio.onclick = reiniciarCuentaAdmin;
    panelAdmin.querySelector('.admin-stats').appendChild(botonReinicio);
  }

  inicializarAdmin();
  actualizarNavegacion();
  navegarA('catalogo');
  mostrarMasVendidos();
  mostrarMejorValorados();

  // Agregar event listeners para los botones de login/register
  document.getElementById("btnLogin")?.addEventListener("click", () => navegarA('login'));
  document.getElementById("btnRegister")?.addEventListener("click", () => navegarA('register'));
});

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  mostrarNotificacion("Sesión cerrada correctamente", "success");
  actualizarNavegacion();
  navegarA('catalogo');
}

// Agregar sección de verificación
const seccionVerificacion = document.createElement('section');
seccionVerificacion.id = 'verificacion';
seccionVerificacion.className = 'auth-section';
seccionVerificacion.innerHTML = `
  <div class="auth-container">
    <h2><i class="fas fa-envelope"></i> Verificación de Email</h2>
    <form id="verificacionForm" class="auth-form">
      <div class="form-group">
        <label for="codigoVerificacion"><i class="fas fa-key"></i> Código de verificación:</label>
        <input type="text" id="codigoVerificacion" name="codigoVerificacion" required>
      </div>
      <button type="submit" class="btn-primary">Verificar</button>
    </form>
    <p id="verificacionMessage" class="message"></p>
  </div>
`;
document.querySelector('main').appendChild(seccionVerificacion);

// Manejar verificación
document.getElementById("verificacionForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const codigo = document.getElementById("codigoVerificacion").value.trim();
  const mensaje = document.getElementById("verificacionMessage");
  
  const usuariosPendientes = JSON.parse(localStorage.getItem("usuariosPendientes")) || [];
  const usuarioPendiente = usuariosPendientes.find(u => u.codigoVerificacion === codigo);
  
  if (usuarioPendiente) {
    // Mover usuario a la lista de usuarios verificados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push({
      name: usuarioPendiente.name,
      email: usuarioPendiente.email,
      password: usuarioPendiente.password
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
    // Eliminar usuario pendiente
    usuariosPendientes.splice(usuariosPendientes.indexOf(usuarioPendiente), 1);
    localStorage.setItem("usuariosPendientes", JSON.stringify(usuariosPendientes));
    
    mostrarNotificacion("¡Email verificado exitosamente! Ya puedes iniciar sesión.", "success");
    navegarA('login');
  } else {
    mensaje.textContent = "Código de verificación inválido ❌";
    mensaje.style.color = "red";
  }
});

// Agregar secciones de juegos más vendidos y mejor valorados
const seccionMasVendidos = document.createElement('section');
seccionMasVendidos.id = 'masVendidos';
seccionMasVendidos.className = 'catalog-section';
seccionMasVendidos.innerHTML = `
  <h2><i class="fas fa-trophy"></i> Juegos Más Vendidos</h2>
  <div id="listaMasVendidos" class="grid-catalogo"></div>
`;

const seccionMejorValorados = document.createElement('section');
seccionMejorValorados.id = 'mejorValorados';
seccionMejorValorados.className = 'catalog-section';
seccionMejorValorados.innerHTML = `
  <h2><i class="fas fa-star"></i> Juegos Mejor Valorados</h2>
  <div id="listaMejorValorados" class="grid-catalogo"></div>
`;

document.querySelector('main').insertBefore(seccionMasVendidos, document.getElementById('catalogo'));
document.querySelector('main').insertBefore(seccionMejorValorados, document.getElementById('catalogo'));

// Función para mostrar juegos más vendidos
function mostrarMasVendidos() {
  const juegosOrdenados = [...juegos].sort((a, b) => b.ventas - a.ventas);
  const contenedor = document.getElementById("listaMasVendidos");
  contenedor.innerHTML = "";

  juegosOrdenados.forEach((juego, index) => {
    const card = document.createElement("div");
    card.classList.add("juego-card");
    card.innerHTML = `
      <h3>${juego.nombre}</h3>
      <p>Categoría: ${juego.categoria}</p>
      <p>Plataforma: ${juego.plataforma}</p>
      <p>Precio: $${juego.precio.toFixed(2)}</p>
      <p>Ventas: ${juego.ventas} unidades</p>
      ${juego.oferta ? `<p class="oferta">🔥 En oferta</p>` : ""}
      <button onclick="agregarAlCarrito(${juegos.indexOf(juego)})">Agregar al carrito 🛒</button>
    `;
    contenedor.appendChild(card);
  });
}

// Función para mostrar juegos mejor valorados
function mostrarMejorValorados() {
  const juegosOrdenados = [...juegos].sort((a, b) => b.valoracion - a.valoracion);
  const contenedor = document.getElementById("listaMejorValorados");
  contenedor.innerHTML = "";

  juegosOrdenados.forEach((juego, index) => {
    const card = document.createElement("div");
    card.classList.add("juego-card");
    card.innerHTML = `
      <h3>${juego.nombre}</h3>
      <p>Categoría: ${juego.categoria}</p>
      <p>Plataforma: ${juego.plataforma}</p>
      <p>Precio: $${juego.precio.toFixed(2)}</p>
      <p>Valoración: ${juego.valoracion} ⭐</p>
      ${juego.oferta ? `<p class="oferta">🔥 En oferta</p>` : ""}
      <button onclick="agregarAlCarrito(${juegos.indexOf(juego)})">Agregar al carrito 🛒</button>
    `;
    contenedor.appendChild(card);
  });
}

