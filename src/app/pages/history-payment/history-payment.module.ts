import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPaymentPageRoutingModule } from './history-payment-routing.module';

import { HistoryPaymentPage } from './history-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPaymentPageRoutingModule
  ],
  declarations: [HistoryPaymentPage]
})
export class HistoryPaymentPageModule {}
