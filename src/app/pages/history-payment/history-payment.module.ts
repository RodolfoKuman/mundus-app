import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPaymentPageRoutingModule } from './history-payment-routing.module';

import { HistoryPaymentPage } from './history-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HistoryPaymentPageRoutingModule
  ],
  declarations: [HistoryPaymentPage]
})
export class HistoryPaymentPageModule {}
