import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryPaymentPage } from './history-payment.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryPaymentPageRoutingModule {}
