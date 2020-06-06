import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router, NavigationExtras } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

const { Browser } = Plugins;

export interface Artículo {
  titulo: string
  entradilla: string
  cuerpo: string
  autor?: string // tal vez de un interfaz autor
  publishedDate: string // tal vez date
  imagen: string
  tipo: string // En un futuro un enum,
  likes: number,
  comentarios: any[]
}

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  articulos: Artículo[] = [
    {
      titulo: "Contra los insultos y los bulos, más políticas progresistas",
      entradilla: "Entradilla de ejemplo",
      cuerpo: "La portavoz del PP en el Congreso, Cayetana Álvarez de Toledo, ha llamado “terrorista” al padre del vicepresidente Pablo Iglesias, un militante antifascista que fue encarcelado por repartir panfletos en el ocaso de la dictadura franquista. En sus discursos, cada vez más agresivos, Pablo Casado habla más de Venezuela que de España; más de Fidel Castro, ya fallecido, o de ETA, que no existe, que de los problemas reales del país. Estamos en medio de una pandemia y necesitamos responsabilidad de los líderes políticos, pero esta oposición se opone a todo, inclusive a salvar vidas. Transforman cada medida del gobierno –aún aquellas que en otros países serían objeto de negociación o de amplios consensos– en una “batalla final” por España. Las derechas han resucitado la retórica macarthista de la Guerra Fría intentando equiparar fascismo y antifascismo, resistencia y terrorismo En esa escalada, cada día es más difícil distinguir a la derecha de la extrema derecha, porque los medios al servicio del poder económico se han sumado felizmente a la algarada.Muchos se refieren a la administración de Pedro Sánchez como “social comunista”, lo que debe causar risa a politólogos e historiadores.Al mismo tiempo, se normalizan los discursos de odio, las incitaciones al golpismo, la hipérbole permanente, la retórica violenta de una ultraderecha cada vez más ultra y la vuelta a la escena de símbolos, consignas y gritos de guerra del fascismo y el franquismo. Las derechas han resucitado la retórica macarthista de la Guerra Fría, en versión vintage y caricaturesca, intentando equiparar fascismo y antifascismo, resistencia y terrorismo.Diputados de Vox denuncian fantasiosos planes para “imponer el modelo chavista”; cargan contra la inexistente “ideología de género”; promueven pines parentales, odio contra LGBTs, mentiras sobre los inmigrantes pobres, xenofobia, racismo, repulsión al feminismo, negación de la violencia de género.Además, estigmatizan los pactos y el pluralismo parlamentario, sobre todo si estos incluyen a los nacionalismos periféricos. ",
      publishedDate: "29 / 05 / 2020",
      imagen: "https://ctxt.es/images/cache/800x540/nocrop/images%7Ccms-image-000022794.jpg",
      tipo: "Editorial",
      likes: 12,
      comentarios: []
    }
  ]
  articulosFiltrados: Artículo[] = this.articulos
  isItemAvailable: boolean;

  constructor(private router: Router, private socialSharing: SocialSharing) { }

  ngOnInit() {
  }

  async goToSubscriptions() {
    await Browser.open({ url: 'https://agora.ctxt.es/suscripciones/' });
  }

  async goToShop() {
    await Browser.open({ url: 'https://agora.ctxt.es/tienda/' });
  }

  navigateToNew(art) {
    let navigationExtras: NavigationExtras = {
      state: {
        article: art
        // Tal vez debamos pasarle también la imagen del autor.
      }
    };
    console.log("going to navigate")
    this.router.navigate(["article"], navigationExtras)
  }

  share() {
    this.socialSharing.share() // Compartir por ejemplo la url al link original del artículo https://www.youtube.com/watch?v=n3zDuQaSyag
  }

  giveLike(art) {
    this.articulos.find(a => a == art).likes++
    // giveLike debe ser una función que llame a la base de datos y consulte si se ha dado un like a este artículo desde esta cuenta o dispositivo, si se ha dado, no se puede dar más y se bloquea.
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    console.log("value from searchBar ", val.trim())
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.articulosFiltrados = this.articulos.filter(item => {
        console.log("Filtering item:", item.titulo.length)
        return item.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.entradilla.toLowerCase().indexOf(val.toLowerCase()) > -1 // || item.autor.toLowerCase().indexOf(val.toLowerCase()) > -1 // En un futuro cuando añadamos autores
      })
      console.log("Art filtrados: ", this.articulosFiltrados)
      this.articulosFiltrados.forEach(art => console.log(art.titulo))
    }
  }
}
