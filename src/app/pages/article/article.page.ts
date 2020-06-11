import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  id: string
  article
  autor
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private modalController: ModalController, private articleService: ArticleService, private userService: UserService) {
    this.activatedRoute.paramMap.subscribe(data => {
      this.id = data.get('id')
      this.articleService.getOneArticle(this.id).then(result => {
        this.article = result.data()
        console.log("Artículo específico:", this.article)
      }).then(() => {
        this.userService.getUserByRef(this.article.autor).then(res => {
          if (res.data().nombre) this.autor = res.data()
          console.log('autor', this.autor)
        })
      })
    })

  }

  ngOnInit() {
  }


  addComment() {
    // Aquí hay que generar un modal que muestre los comentarios y permita añadir uno
  }

  zooming(ev) {
    console.log("zoom zoom!", ev)
  }
}
