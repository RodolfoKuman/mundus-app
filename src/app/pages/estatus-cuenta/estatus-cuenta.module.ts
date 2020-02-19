import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstatusCuentaPageRoutingModule } from './estatus-cuenta-routing.module';

import { EstatusCuentaPage } from './estatus-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstatusCuentaPageRoutingModule
  ],
  declarations: [EstatusCuentaPage]
})
export class EstatusCuentaPageModule {}
