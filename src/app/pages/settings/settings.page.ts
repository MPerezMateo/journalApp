import { Component, OnInit, RendererFactory2, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  renderer: Renderer2
  nightMode: boolean = false// debemos inicializarlo desde storage
  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
    this.renderer = rendererFactory.createRenderer(null, null);
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
}
