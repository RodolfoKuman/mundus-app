import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { EstadoCuentaPageRoutingModule } from './estado-cuenta-routing.module';

import { EstadoCuentaPage } from './estado-cuenta.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    EstadoCuentaPageRoutingModule
  ],
  declarations: [EstadoCuentaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EstadoCuentaPageModule { }
