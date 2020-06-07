import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageReference } from '@angular/fire/storage/ref';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // EN UN FUTURO ESTE SERVICIO SERÁ LA AJAX REQUEST AL SERVIDOR DE CTXT

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private storage: AngularFireStorage) { }

  getAllUsers(): Observable<any> {
    return this.db.collection('usuarios').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id
        const data = <Object>a.payload.doc.data()
        return { id, ...data }
      })))
  }

  getUser(id): Promise<any> {
    return this.db.doc(`usuarios/${id}`).get().toPromise()
  }

  getUserByRef(ref): Promise<any> {
    return this.db.doc(ref).get().toPromise()
  }
}
