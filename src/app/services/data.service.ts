import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core"
// Este servicio sirve para comunicar la app con el almacenamiento de DATOS LOCALES

const { Storage } = Plugins

// Todas las keys para los values a almacenar en la app
const NOCHE_KEY = 'modo_noche' // Modo noche aplicado o no
const PREF_KEY = 'preferencias' // Cuales son sus preferencias de cara a las notificaciones
const NOTIF_KEY = 'notificaciones_activas' // Si quiere recibir notificaciones o no
const FONT_KEY = 'tamano_fuente' // Tamaño de la fuente por defecto en píxeles

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor() { }

  async getPrefs() {
    const prefs = (await Storage.get({ key: PREF_KEY })).value
    return JSON.parse(prefs)
  }

  async setPrefs(prefs) {
    return await Storage.set({ key: PREF_KEY, value: JSON.stringify(prefs) })
  }

  async getNightMode() {
    const nmode = (await Storage.get({ key: NOCHE_KEY })).value
    return JSON.parse(nmode)
  }

  async setNightMode(newMode) {
    return await Storage.set({ key: NOCHE_KEY, value: JSON.stringify(newMode) })
  }

  async getAllowNotif() {
    const not = await (await Storage.get({ key: NOTIF_KEY })).value
    return JSON.parse(not)
  }

  async setAllowNotif(allowed) {
    return await Storage.set({ key: NOTIF_KEY, value: JSON.stringify(allowed) })
  }

  async getFontSize() {
    const font = (await Storage.get({ key: FONT_KEY })).value
    return JSON.parse(font)
  }

  async setFontSize(fontSize) {
    return await Storage.set({ key: FONT_KEY, value: JSON.stringify(fontSize) })
  }
}
