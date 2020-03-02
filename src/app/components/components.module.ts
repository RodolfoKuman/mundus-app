import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCardComponent } from './payment-card/payment-card.component';
import { IonicModule } from '@ionic/angular';
import { SafePipe } from '../pipes/safe-pipe.pipe';

@NgModule({
  declarations: [
    PaymentCardComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PaymentCardComponent,
    SafePipe
  ]
})
export class ComponentsModule { }
