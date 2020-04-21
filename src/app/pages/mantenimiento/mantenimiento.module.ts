import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

import { IonicModule } from '@ionic/angular';

import { MantenimientoPageRoutingModule } from './mantenimiento-routing.module';

import { MantenimientoPage } from './mantenimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MantenimientoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MantenimientoPage]
})
export class MantenimientoPageModule {}
