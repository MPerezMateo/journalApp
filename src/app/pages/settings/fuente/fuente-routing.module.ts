import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuentePage } from './fuente.page';

const routes: Routes = [
  {
    path: '',
    component: FuentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuentePageRoutingModule {}
