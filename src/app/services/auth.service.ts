import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private navCtrl: NavController) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }
  signIn(creds): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(creds.email, creds.password)).pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc(`users/${user.user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  signUp(creds) {
    return this.afAuth.createUserWithEmailAndPassword(creds.email, creds.password).then(data => {
      console.log('after register: ', data);
      return this.db.doc(`users/${data.user.uid}`).set({
        name: creds.name,
        email: creds.email,
        role: creds.role,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    })
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('/')
    })
  }
}
