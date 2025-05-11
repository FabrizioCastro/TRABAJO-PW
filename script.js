// LOGIN
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("loginMessage");

  const tieneArroba = email.includes("@");
  const tienePunto = email.includes(".");

  if (!tieneArroba || !tienePunto) {
    mensaje.textContent = "El correo es incorrecto ❌";
    mensaje.style.color = "red";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado = usuarios.find(
    usuario => usuario.email === email && usuario.password === password
  );

  if (usuarioEncontrado) {
  mensaje.textContent = `Bienvenido/a, ${usuarioEncontrado.name} 🎮`;
  mensaje.style.color = "green";

  // Guardar sesión activa
  localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

  // Mostrar panel admin si el correo es del administrador
  if (usuarioEncontrado.email === "admin@admin.com") {
    mostrarPanelAdmin();
  }
}
 else {
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
    mensaje.textContent = "El correo es incorrecto ❌";
    mensaje.style.color = "red";
    return;
  }

  if (password.length < 6) {
    mensaje.textContent = "La contraseña debe tener al menos 6 caracteres 🔐";
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

  usuarios.push({ name, email, password });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  mensaje.textContent = "Registro exitoso 🎉 ¡Ya puedes iniciar sesión!";
  mensaje.style.color = "green";
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
  carrito.push(juegos[index]);
  actualizarCarrito();
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
  carrito.splice(index, 1);
  actualizarCarrito();
}

// PAGO CON RESUMEN
document.getElementById("btnPagar").addEventListener("click", () => {
  const mensajePago = document.getElementById("mensajePago");

  if (carrito.length === 0) {
    mensajePago.textContent = "El carrito está vacío ❌";
    mensajePago.style.color = "red";
    return;
  }

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
mostrarHistorial(); // Mostrar el historial actualizado

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

