import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core"
// Este servicio sirve para comunicar la app con el almacenamiento de DATOS LOCALES

const { Storage } = Plugins

// Todas las keys para los values a almacenar en la app
const NOCHE_KEY = 'modo_noche'
const PREF_KEY = 'preferencias'

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor() { }

  async setPrefs(prefs) {
    return await Storage.set({ key: PREF_KEY, value: JSON.stringify(prefs) })
  }

  async getPrefs() {
    const prefs = (await Storage.get({ key: PREF_KEY })).value
    return JSON.parse(prefs)
  }

  async setNightMode(newMode) {
    return await Storage.set({ key: NOCHE_KEY, value: JSON.stringify(newMode) })
  }

  async getNightMode() {
    const nmode = await Storage.get({ key: NOCHE_KEY })
    let mode = JSON.parse(nmode.value)
    return mode
  }
}
