import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoCuentaPage } from './estado-cuenta.page';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: 'estado-cuenta',
    component: EstadoCuentaPage
  }
];

@NgModule({
  imports: [IonicModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadoCuentaPageRoutingModule { }
