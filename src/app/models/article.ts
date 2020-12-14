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
  likes: string[] // Es una matriz con los ids de los usuarios que han dado like. Si se consulta la cantidad es con .length
  comentarios: any[], // En un futuro un interfaz de comentarios
  categorias?: Categorias[]//
}