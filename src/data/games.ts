export interface Game {
  nombre: string
  categoria: string
  plataforma: string
  precio: number
  oferta: boolean
  ventas: number
  valoracion: number
}

export const juegos: Game[] = [
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
]
