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
}

export const juegos: Game[] = [
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
    imagen: "/ELDEN-RING.avif"
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
    imagen: "/GOD-OF-WAR.webp"
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
    imagen: "/HOLLOW-KNIGHT.jpg"
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
    imagen: "/XELDA.avif"
  }
]
