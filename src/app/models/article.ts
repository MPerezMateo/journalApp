import { Autor } from "./user";
import { Categorias } from "./categorias"
export interface Artículo {
  titulo: string
  entradilla: string
  cuerpo: string
  autor?: Autor
  publishedDate: string
  imagen: string
  tipo: string // En un futuro un enum,
  likes: number,
  comentarios: any[], // En un futuro un interfaz de comentarios
  categorias?: Categorias[]//
}