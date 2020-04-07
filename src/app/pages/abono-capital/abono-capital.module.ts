import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

import { IonicModule } from '@ionic/angular';

import { AbonoCapitalPageRoutingModule } from './abono-capital-routing.module';

import { AbonoCapitalPage } from './abono-capital.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    AbonoCapitalPageRoutingModule
  ],
  declarations: [AbonoCapitalPage]
})
export class AbonoCapitalPageModule {}
