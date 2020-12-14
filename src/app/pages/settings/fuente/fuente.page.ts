import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonTextarea, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-fuente',
  templateUrl: './fuente.page.html',
  styleUrls: ['./fuente.page.scss'],
})
export class FuentePage implements AfterViewInit {
  fontSize: number
  newSize: number
  constructor(private dataService: DataService, private toastController: ToastController) { }

  ngAfterViewInit() {
    this.dataService.getFontSize().then(res => {
      this.fontSize = res
      document.getElementsByTagName("ion-textarea")[0].style.fontSize = `${this.fontSize}px`
    })
  }

  changeFont(event) {
    this.newSize = event.detail.value
    document.getElementsByTagName("ion-textarea")[0].style.fontSize = `${this.newSize}px`
  }

  cambiar() {
    if (this.newSize) {
      this.dataService.setFontSize(this.newSize).then(async () => {
        let toast = await this.toastController.create({
          duration: 3000,
          message: '¡Cambiado el tamaño de la letra!'
        })
        toast.present()
      })
    } else {
      let toast = this.toastController.create({
        duration: 3000,
        message: 'No has cambiado el tamaño de letra, elige un tamaño distinto al que tenías'
      }).then(() => toast.present())
    }
  }
}
