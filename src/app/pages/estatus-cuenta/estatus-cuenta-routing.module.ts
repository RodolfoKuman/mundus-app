import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstatusCuentaPage } from './estatus-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: EstatusCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstatusCuentaPageRoutingModule {}
