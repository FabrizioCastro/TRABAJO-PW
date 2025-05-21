export interface Usuario {
  name: string
  email: string
  password: string
  fechaRegistro: string
  imagen?: string 
}

export const usuarios: Usuario[] = [
  {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    password: "hashed_password_123",
    fechaRegistro: "2024-11-01T10:00:00.000Z",
    imagen: "/juan.png" 
  },
  {
    name: "Ana Gómez",
    email: "ana.gomez@example.com",
    password: "hashed_password_456",
    fechaRegistro: "2025-01-15T08:30:00.000Z",
    imagen: "/ana.jpg"
  },
  {
    name: "Carlos Ruiz",
    email: "carlos.ruiz@example.com",
    password: "hashed_password_789",
    fechaRegistro: "2025-03-22T14:45:00.000Z",
    imagen: "/carlos.jpeg"
  }
]
