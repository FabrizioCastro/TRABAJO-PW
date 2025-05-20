export interface Review {
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Game {
  id: number
  nombre: string
  descripcion: string
  categoria: string
  plataforma: string
  precio: number
  oferta: boolean
  ventas: number
  valoracion: number
  imagen?: string // 🔍 Nueva propiedad
  reviews: Review[]
  descuento?: number // Porcentaje de descuento (0-100)
  claves: string[] // Array de claves disponibles para el juego
}

// Juegos por defecto
const juegosDefault: Game[] = [
  {
    id: 1,
    nombre: "Elden Ring",
    descripcion: "Un juego de mundo abierto lleno de peligros y aventuras.",
    categoria: "RPG",
    plataforma: "PC",
    precio: 59.99,
    oferta: true,
    ventas: 150,
    valoracion: 4.8,
    imagen: "/ELDEN-RING.avif",
    reviews: [],
    claves: ["ELDEN-RING-XXXX-XXXX-XXXX", "ELDEN-RING-YYYY-YYYY-YYYY"]
  },
  {
    id: 2,
    nombre: "God of War",
    descripcion: "Kratos regresa con una historia épica de venganza y redención.",
    categoria: "Acción",
    plataforma: "PlayStation",
    precio: 49.99,
    oferta: false,
    ventas: 200,
    valoracion: 4.9,
    imagen: "/GOD-OF-WAR.webp",
    reviews: [],
    claves: ["GOW-XXXX-XXXX-XXXX", "GOW-YYYY-YYYY-YYYY"]
  },
  {
    id: 3,
    nombre: "Hollow Knight",
    descripcion: "Explora un reino subterráneo en este metroidvania desafiante.",
    categoria: "Metroidvania",
    plataforma: "PC",
    precio: 14.99,
    oferta: true,
    ventas: 300,
    valoracion: 4.7,
    imagen: "/HOLLOW-KNIGHT.jpg",
    reviews: [],
    claves: []
  },
  {
    id: 4,
    nombre: "The Legend of Zelda",
    descripcion: "Una aventura mágica con puzles, combate y exploración.",
    categoria: "Aventura",
    plataforma: "Nintendo",
    precio: 69.99,
    oferta: false,
    ventas: 250,
    valoracion: 4.9,
    imagen: "/XELDA.avif",
    reviews: [],
    claves: []
  },
  {
    id: 5,
    nombre: "GTA 6",
    descripcion: "Próximamente: La nueva entrega de la saga Grand Theft Auto.",
    categoria: "Acción",
    plataforma: "PlayStation",
    precio: 69.99,
    oferta: false,
    ventas: 0,
    valoracion: 0,
    imagen: "/GTA-6.jpg",
    reviews: [],
    claves: []
  },
  {
    id: 6,
    nombre: "The Witcher 3",
    descripcion: "Un RPG de mundo abierto con una historia épica y gráficos impresionantes.",
    categoria: "RPG",
    plataforma: "PC",
    precio: 29.99,
    oferta: true,
    ventas: 400,
    valoracion: 4.9,
    imagen: "/WITCHER-3.jpeg",
    reviews: [],
    claves: []
  },
  {
    id: 7,
    nombre: "Red Dead Redemption 2",
    descripcion: "Una historia épica del salvaje oeste con gráficos realistas y jugabilidad inmersiva.",
    categoria: "Aventura",
    plataforma: "PlayStation",
    precio: 39.99,
    oferta: false,
    ventas: 350,
    valoracion: 4.8,
    imagen: "/RDR2.jpeg",
    reviews: [],
    claves: []
  },
  {
    id: 8,
    nombre: "Cyberpunk 2077",
    descripcion: "Un RPG de mundo abierto en un futuro distópico con gráficos de última generación.",
    categoria: "RPG",
    plataforma: "PC",
    precio: 49.99,
    oferta: true,
    ventas: 200,
    valoracion: 4.5,
    imagen: "/CYBERPUNK.jpeg",
    reviews: [],
    claves: []
  },
  {
    id: 9,
    nombre: "The Last of Us Part II",
    descripcion: "Una historia emocionante de supervivencia y venganza en un mundo post-apocalíptico.",
    categoria: "Aventura",
    plataforma: "PlayStation",
    precio: 59.99,
    oferta: false,
    ventas: 300,
    valoracion: 4.7,
    imagen: "/LASTOFUS2.jpeg",
    reviews: [],
    claves: []
  },
  {
    id: 10,
    nombre: "FIFA 24",
    descripcion: "El simulador de fútbol más realista con gráficos y jugabilidad mejorados.",
    categoria: "Deportes",
    plataforma: "PC",
    precio: 69.99,
    oferta: false,
    ventas: 250,
    valoracion: 4.6,
    imagen: "/FIFA24.jpg",
    reviews: [],
    claves: []
  }
]

// Función para obtener los juegos del localStorage o usar los valores por defecto
export const getJuegos = (): Game[] => {
  const juegosGuardados = localStorage.getItem("juegos")
  if (juegosGuardados) {
    return JSON.parse(juegosGuardados)
  }
  // Si no hay juegos guardados, guardar los valores por defecto
  localStorage.setItem("juegos", JSON.stringify(juegosDefault))
  return juegosDefault
}

// Exportar los juegos por defecto para uso inicial
export const juegos = getJuegos()
