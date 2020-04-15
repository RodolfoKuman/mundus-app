import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCardComponent } from './payment-card/payment-card.component';
import { IonicModule } from '@ionic/angular';
import { SafePipe } from '../pipes/safe-pipe.pipe';
import { NumberPipePipe } from '../pipes/number-pipe.pipe';

@NgModule({
  declarations: [
    PaymentCardComponent,
    SafePipe,
    NumberPipePipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PaymentCardComponent,
    SafePipe,
    NumberPipePipe
  ]
})
export class ComponentsModule { }
