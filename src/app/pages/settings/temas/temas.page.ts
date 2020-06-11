import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/models/categorias';
import { DataService } from 'src/app/services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.page.html',
  styleUrls: ['./temas.page.scss'],
})
export class TemasPage implements OnInit {
  temas: Categorias[] = [Categorias.contexto, Categorias.firma, Categorias.ministerio, Categorias.editorial, Categorias.crisisEcosocial, Categorias.feminismo, Categorias.entrevista, Categorias.deporte, Categorias.vineta, Categorias.ctxtCat, Categorias.coronavirus]

  opciones: any[] = [{ tema: Categorias.contexto, preferido: false }, { tema: Categorias.firma, preferido: false }, { tema: Categorias.ministerio, preferido: false }, { tema: Categorias.editorial, preferido: false }, { tema: Categorias.crisisEcosocial, preferido: false }, { tema: Categorias.feminismo, preferido: false }, { tema: Categorias.entrevista, preferido: false }, { tema: Categorias.deporte, preferido: false }, { tema: Categorias.vineta, preferido: false }, { tema: Categorias.ctxtCat, preferido: false }, { tema: Categorias.coronavirus, preferido: false }]

  constructor(private dataService: DataService, private toastController: ToastController) { }

  ngOnInit() {
    this.loadPrefs()
  }


  async cambiar() {
    this.dataService.setPrefs(this.opciones)
    let toast = await this.toastController.create({
      duration: 3000,
      message: '¡Se han cambiado tus preferencias!'
    })
    toast.present()
  }

  async loadPrefs() {
    var res = await this.dataService.getPrefs()
    if (res != null) {
      this.opciones = res
    }
  }
}
