import { Component, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router, NavigationExtras } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Artículo } from "../../models/article"
import { Autor } from "../../models/user"
import { Categorias } from 'src/app/models/categorias';
import { IonSelect } from "@ionic/angular"
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { filter, mergeAll, map } from 'rxjs/operators';

const { Browser } = Plugins;

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  @ViewChild(IonSelect) select: IonSelect

  articulos: Observable<any>
  articulosFiltrados: Observable<any>
  tags: Categorias[] = [] // Tags de categorías por las que filtrar
  categorias: Object = { contexto: Categorias.contexto, firma: Categorias.firma, ministerio: Categorias.ministerio, editorial: Categorias.editorial, crisisEcosocial: Categorias.crisisEcosocial, feminismo: Categorias.feminismo, entrevista: Categorias.entrevista, deporte: Categorias.deporte, vineta: Categorias.vineta, ctxtCat: Categorias.ctxtCat, coronavirus: Categorias.coronavirus }
  images: any

  constructor(private router: Router, private socialSharing: SocialSharing, private articleService: ArticleService) { }

  ngOnInit() {
    this.articulos = this.articulosFiltrados = this.articleService.getAllArticles()
    this.articleService.getAllArticles().subscribe(res => {
    })
  }

  async goToSubscriptions() {
    await Browser.open({ url: 'https://agora.ctxt.es/suscripciones/' });
  }

  async goToShop() {
    await Browser.open({ url: 'https://agora.ctxt.es/tienda/' });
  }

  navigateToNew(art) {
    console.log("Articulo navegado", art)
    let navigationExtras: NavigationExtras = {
      state: {
        article: art.id // Tal vez debamos pasarle también la imagen del autor.
      }
    };
    this.router.navigate(["article"], navigationExtras)
  }

  share() {
    this.socialSharing.share() // Compartir por ejemplo la url al link original del artículo https://www.youtube.com/watch?v=n3zDuQaSyag
  }

  giveLike(art) {
    //this.articulos.find(a => a == art).likes++
    // giveLike debe ser una función que llame a la base de datos y consulte si se ha dado un like a este artículo desde esta cuenta o dispositivo, si se ha dado, no se puede dar más y se bloquea.
    // en la base de datos, el like debe ir enlazado al uid, de tal forma que no permite dar mas de 1 like por uid
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.articulosFiltrados = this.articulos.pipe(
        map(artic => artic.filter(item => {
          return item.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.entradilla.toLowerCase().indexOf(val.toLowerCase()) > -1 // || item.autor.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 // En un futuro cuando añadamos autores
        })
        )
      )
      //this.articulosFiltrados.forEach(art => console.log(art.titulo))
    }
  }

  addTags(event) {
    this.tags = event.detail.value
    // Loquisimo pero funciona **¡Ojo los returns, son importantes!**
    if (this.tags.length != 0) {
      this.articulosFiltrados = this.articulosFiltrados.pipe(
        map(artic => artic.filter(art => art.categorias.some(cat => { return this.tags.map(tap => tap.nombre).some(nombre => nombre == cat.nombre) })))
      )
    }
    else { this.articulosFiltrados = this.articulos }
  }

  removeTag(tag) {
    this.tags = this.tags.filter(t => t != tag)
    if (this.tags.length == 0) {
      this.articulosFiltrados = this.articulos
    } else {
      //this.articulosFiltrados = this.articulosFiltrados.filter(art => { art.categorias.some(cat => { this.tags.includes(cat.nombre); console.log("¿Hay una categoría coindicente?", art.categorias) }) })
    }
  }

  openSelect(event) {
    this.select.open()
  }

  loadMore(ev) {
    setTimeout(() => {
      console.log('Async operation has ended');
      ev.target.complete();
    }, 2000);
  } // Función que se llama con el scrolldown

  loadNewest(ev) {
    setTimeout(() => {
      console.log('Async operation has ended');
      ev.target.complete();
    }, 2000);
  } // función que se llama con el dragup (scrollup )
}
