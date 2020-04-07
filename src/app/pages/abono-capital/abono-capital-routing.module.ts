import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbonoCapitalPage } from './abono-capital.page';

const routes: Routes = [
  {
    path: '',
    component: AbonoCapitalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbonoCapitalPageRoutingModule {}
