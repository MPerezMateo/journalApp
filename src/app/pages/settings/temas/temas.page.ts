import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/models/categorias';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.page.html',
  styleUrls: ['./temas.page.scss'],
})
export class TemasPage implements OnInit {
  temas: Categorias[] = [Categorias.contexto, Categorias.firma, Categorias.ministerio, Categorias.editorial, Categorias.crisisEcosocial, Categorias.feminismo, Categorias.entrevista, Categorias.deporte, Categorias.vineta, Categorias.ctxtCat, Categorias.coronavirus]

  constructor() { }

  ngOnInit() {
  }

}
