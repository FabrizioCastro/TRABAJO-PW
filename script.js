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
    usuarios.push({
      name: "Administrador",
      email: "admin@admin.com",
      password: hashPassword("admin")
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
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

  const hashedPassword = hashPassword(password);
  usuarios.push({ name, email, password: hashedPassword });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  mostrarNotificacion("Registro exitoso. Por favor inicia sesión.", "success");
  navegarA('login');
  document.getElementById("registerForm").reset();
});

// CATÁLOGO DE JUEGOS
const juegos = [
  {
    nombre: "Elden Ring",
    categoria: "RPG",
    plataforma: "PC",
    precio: 59.99,
    oferta: true
  },
  {
    nombre: "God of War",
    categoria: "Acción",
    plataforma: "PlayStation",
    precio: 49.99,
    oferta: false
  },
  {
    nombre: "Hollow Knight",
    categoria: "Metroidvania",
    plataforma: "PC",
    precio: 14.99,
    oferta: true
  },
  {
    nombre: "The Legend of Zelda",
    categoria: "Aventura",
    plataforma: "Nintendo",
    precio: 69.99,
    oferta: false
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
  document.getElementById("totalUsuarios").textContent = usuarios.length;
  document.getElementById("panelAdmin").style.display = "block";
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

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  inicializarAdmin();
  actualizarNavegacion();
  navegarA('catalogo');

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

