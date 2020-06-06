import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  article

  constructor(private router: Router, private route: ActivatedRoute, private modalController: ModalController) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.article = this.router.getCurrentNavigation().extras.state.article
      console.log("Artículo específico:", this.article)
    }
  }

  ngOnInit() {
  }


  addComment() {
    // Aquí hay que generar un modal que muestre los comentarios y permita añadir uno
  }
}
