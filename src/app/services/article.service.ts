import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageReference } from '@angular/fire/storage/ref';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // EN UN FUTURO ESTE SERVICIO SERÁ LA AJAX REQUEST AL SERVIDOR DE CTXT

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private storage: AngularFireStorage) { }

  getAllArticles() {
    return this.db.collection('artículos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id
        const data = <Object>a.payload.doc.data()
        return { id, ...data }
      })))
  }

  getOneArticle(id) {
    return this.db.doc(`artículos/${id}`).get().toPromise()
  }
}
