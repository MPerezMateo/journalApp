import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuentePageRoutingModule } from './fuente-routing.module';

import { FuentePage } from './fuente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FuentePageRoutingModule
  ],
  declarations: [FuentePage]
})
export class FuentePageModule {}
