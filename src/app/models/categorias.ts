export class Categorias {
  static readonly contexto = new Categorias('contexto', 'chatbubble-outline', '');
  static readonly firma = new Categorias('firma', 'brush-outline', '');
  static readonly ministerio = new Categorias('ministerio', 'business-outline', '');
  static readonly editorial = new Categorias('editorial', 'easel-outline', '');
  static readonly crisisEcosocial = new Categorias('crisis ecosocial', 'leaf-outline', '');
  static readonly feminismo = new Categorias('feminismo', 'female-outline', 'fem');
  static readonly entrevista = new Categorias('entrevista', 'chatbubbles-outline', '');
  static readonly deporte = new Categorias('deporte', 'chatbubbles-outline', '');
  static readonly vineta = new Categorias('vineta', 'radio-button-off-outline', '');
  static readonly ctxtCat = new Categorias('ctxt.cat', 'book-outline', '');
  static readonly coronavirus = new Categorias('coronavirus', 'flask-outline', '');

  // private to disallow creating other instances of this type
  private constructor(public readonly nombre: string, public readonly icono: string, public readonly color: string) {
  }

  toString() {
    return this.nombre;
  }
}