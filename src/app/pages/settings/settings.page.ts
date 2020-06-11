import { Component, OnInit, RendererFactory2, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  renderer: Renderer2
  nightMode: boolean  // debemos inicializarlo desde storage
  notificaciones: boolean = false // Activadas o desactivadas, en un futuro estará coordinado con la base de datos y/o local storage
  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document, private toastController: ToastController, private dataService: DataService) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.dataService.getNightMode().then(res => {
      if (res) this.nightMode = true
      else this.nightMode = false
    })
  }

  ngOnInit() {
  }

  toggleTheme() {
    console.log("Cambiando el tema...")
    if (this.nightMode) {
      this.renderer.removeClass(this.document.body, 'dark-theme')
    }
    else {
      this.renderer.addClass(this.document.body, 'dark-theme')
    }
  }

  async notifToast(event) {
    // Aquí hay que comunicarse con la base de datos para que las funcitons globals puedan preguntar por estas 
    const toast = await this.toastController.create({
      message: this.notificaciones ? 'A partir de ahora recibirás notificaciones' : 'A partir de ahora no recibirás notificaciones',
      duration: 1500
    })
    toast.present();
  }

  async nightToast(event) {
    await this.dataService.setNightMode(event.detail.checked)
    if (event.detail.checked) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
    console.log("Night mode? ", event.detail.checked)
    const toast = await this.toastController.create({
      message: this.nightMode ? 'Modo Oscuro activado' : 'Modo Oscuro desactivado',
      duration: 1500
    })
    toast.present();
  }

}
