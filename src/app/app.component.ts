import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkDarkMode()
    });
  }

  async checkDarkMode() {
    var nightmode: boolean = await this.dataService.getNightMode()
    if (nightmode == undefined) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      document.body.classList.toggle('dark')
      console.log("prefered theme is dark? : ", prefersDark.matches)
    } else {
      console.log("prefered theme is dark? : ", nightmode)
      if (nightmode) document.body.classList.add('dark')
      else document.body.classList.remove('dark')
    }
  }
}
