import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstatusCuentaPageRoutingModule } from './estatus-cuenta-routing.module';

import { EstatusCuentaPage } from './estatus-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EstatusCuentaPageRoutingModule
  ],
  declarations: [EstatusCuentaPage]
})
export class EstatusCuentaPageModule {}
