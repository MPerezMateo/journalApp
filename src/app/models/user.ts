import { Artículo } from './article';

export interface Autor extends Usuario {
  publicaciones: Artículo[]
}

export interface Usuario {
  nombre: string
  descrpción: string
  imagen: string

  // agregar datos relativos como: amigos, favoritos, likes dados y otros datos anidados más complejos
}