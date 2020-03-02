import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsPageRoutingModule } from './payments-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { PaymentsPage } from './payments.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PaymentsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PaymentsPage]
})
export class PaymentsPageModule {}
