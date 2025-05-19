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
    imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/YMUoJUYNX0xWk6eTKuZLr5Iw.jpg",
    nombre: "Elden Ring",
    categoria: "RPG",
    plataforma: "PC",
    precio: 59.99,
    oferta: true,
    descripcion: "Un juego de rol épico basado en la saga de Geralt de Rivia."
  },
  {
    imagen: "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg",
    nombre: "God of War",
    categoria: "Acción",
    plataforma: "PlayStation",
    precio: 49.99,
    oferta: false
  },
  {
    imagen: "https://assets.nintendo.com/image/upload/q_auto/f_auto/ncom/software/switch/70010000003208/4643fb058642335c523910f3a7910575f56372f612f7c0c9a497aaae978d3e51",
    nombre: "Hollow Knight",
    categoria: "Metroidvania",
    plataforma: "PC",
    precio: 14.99,
    oferta: true
  },
  {
    imagen: "https://assets.nintendo.com/image/upload/q_auto/f_auto/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58",
    nombre: "The Legend of Zelda",
    categoria: "Aventura",
    plataforma: "Nintendo",
    precio: 69.99,
    oferta: false
  },
  { 
    imagen: "https://cdn-0001.qstv.on.epicgames.com/SRuXXmKmdgfzhyXYLO/image/landscape_comp.jpeg",
    nombre: "Five Nights at freddy´s",
    categoria: "Terror",
    plataforma: "PC",
    precio: 29.99,
    oferta: true
  },
  {
    imagen: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000038005/61f0ce6acdd4e3a6974eb22a50db9b150d9ebf2902bd53b1524f9cf6b1fe6acd",
    nombre: "Remnant: From teh ashes",
    categoria: "Aventura",
    plataforma: "PC",
    precio: 14.99,
    oferta: true
  },
  {
    imagen: "https://www.notebookcheck.org/fileadmin/Notebooks/News/_nc3/PUBG_2.0.jpg",
    nombre: "Player Unknow´s battlegrounds",
    categoria: "Multijugador",
    plataforma: "PC",
    precio: 19.99,
    oferta: false
  },
  {
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1966720/capsule_616x353.jpg?t=1742986399",
    nombre: "Lethal Company",
    categoria: "Cooperativo",
    plataforma: "PC",
    precio: 4.99,
    oferta: true
  },
  {
    imagen: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000019266/6ceb92df22aac4773a3a74de1a41e025d347a6775e0149c42640fd6206cdc446",
    nombre: "Pico Park",
    categoria: "Cooperativo",
    plataforma: "PC",
    precio: 4.99,
    oferta: false
  },

];

function mostrarJuegos(lista) {
  const contenedor = document.getElementById("listaJuegos");
  contenedor.innerHTML = "";

  lista.forEach((juego, index) => {
    const card = document.createElement("div");
    card.classList.add("juego-card");
    
    card.innerHTML = `
      <img src="${juego.imagen}" alt="${juego.nombre}">
      <h3>${juego.nombre}</h3>
      <p>Categoría: ${juego.categoria}</p>
      <p>Plataforma: ${juego.plataforma}</p>
      <p>Precio: $${juego.precio.toFixed(2)}</p>
      <p class="oferta ${juego.oferta ? '' : 'invisible'}">🔥 En oferta</p>
      <button onclick="event.stopPropagation(); agregarAlCarrito(${index})" class="btn btn-primary">Agregar al carrito 🛒</button>
       `;
  
    card.addEventListener("click", () => mostrarDetalleJuego(juego, index));
    contenedor.appendChild(card);
  });
}

function mostrarDetalleJuego(juego, index) {
  const detalle = document.getElementById("detalleJuego");
  detalle.innerHTML = `
    <h3>${juego.nombre}</h3>
    <img src="${juego.imagen}" class="img-fluid rounded mb-3" alt="${juego.nombre}">
    <p><strong>Categoría:</strong> ${juego.categoria}</p>
    <p><strong>Plataforma:</strong> ${juego.plataforma}</p>
    <p><strong>Precio:</strong> $${juego.precio.toFixed(2)}</p>
    <p><strong>Descripción:</strong> ${juego.descripcion || "Sin descripción."}</p>

    ${juego.trailer ? `
      <div class="ratio ratio-16x9 mb-3">
        <iframe src="${juego.trailer}" title="Tráiler del juego" allowfullscreen></iframe>
      </div>
    ` : ""}

    <h5>Reseñas</h5>
    <div id="reseñas-${index}" class="mb-3">Sin reseñas aún</div>

    <div class="mb-3">
      <textarea id="nuevaReseña-${index}" class="form-control" placeholder="Escribe tu reseña..."></textarea>
    </div>
    <button class="btn btn-outline-primary mb-3" onclick="guardarReseña(${index})">Enviar reseña</button>

    <button class="btn btn-success" onclick="agregarAlCarrito(${index})">Agregar al carrito 🛒</button>
  `;

  // Mostrar el modal con Bootstrap
  const modal = new bootstrap.Modal(document.getElementById('modalJuego'));
  modal.show();
}

function guardarReseña(index) {
  const textarea = document.getElementById(`nuevaReseña-${index}`);
  const reseñasDiv = document.getElementById(`reseñas-${index}`);
  if (textarea.value.trim() !== "") {
    const nueva = document.createElement("p");
    nueva.textContent = textarea.value;
    reseñasDiv.appendChild(nueva);
    textarea.value = "";
  }
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



function actualizarContadorCarrito() {
  const contador = document.getElementById("contadorCarrito");
  const cantidad = carrito.length;
  contador.textContent = cantidad;
  contador.style.display = cantidad === 0 ? "none" : "inline-block";
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

