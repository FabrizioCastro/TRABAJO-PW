export interface Review {
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Game {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  plataforma: string;
  precio: number;
  descuento: number; 
  oferta: boolean;
  ventas: number;
  valoracion: number;
  imagen?: File | string;
  reviews: Review[];
  fecha: string; 
}

export const juegos: Game[] = [
  {
    id: 1,
    nombre: "Elden Ring",
    descripcion: "Un juego de mundo abierto lleno de peligros y aventuras.",
    categoria: "RPG",
    plataforma: "PC",
    precio: 59.99,
    descuento: 10,
    oferta: true,
    ventas: 150,
    valoracion: 4.8,
    imagen: "/ELDEN-RING.avif",
    reviews: [],
    fecha: "25-02-2022"
  },
  {
    id: 2,
    nombre: "God of War",
    descripcion: "Kratos regresa con una historia épica de venganza y redención.",
    categoria: "Acción",
    plataforma: "PlayStation",
    precio: 49.99,
    descuento: 0,
    oferta: false,
    ventas: 200,
    valoracion: 4.9,
    imagen: "/GOD-OF-WAR.webp",
    reviews: [],
    fecha: "20-04-2018"
  },
  {
    id: 3,
    nombre: "Hollow Knight",
    descripcion: "Explora un reino subterráneo en este metroidvania desafiante.",
    categoria: "Metroidvania",
    plataforma: "PC",
    precio: 14.99,
    descuento: 25,
    oferta: true,
    ventas: 300,
    valoracion: 4.7,
    imagen: "/HOLLOW-KNIGHT.jpg",
    reviews: [],
    fecha: "24-02-2017"
  },
  {
    id: 4,
    nombre: "The Legend of Zelda",
    descripcion: "Una aventura mágica con puzles, combate y exploración.",
    categoria: "Aventura",
    plataforma: "Nintendo",
    precio: 69.99,
    descuento: 0,
    oferta: false,
    ventas: 250,
    valoracion: 4.9,
    imagen: "/XELDA.avif",
    reviews: [],
    fecha: "03-03-2017"
  }
];
