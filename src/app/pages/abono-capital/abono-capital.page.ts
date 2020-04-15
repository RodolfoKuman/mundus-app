import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';

import { Desarrollo } from '../../interfaces/AccountDetail.interface';
import { Usuario } from '../../interfaces/usuario.interface';

import { MundusApiService } from '../../services/mundus-api.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-abono-capital',
  templateUrl: './abono-capital.page.html',
  styleUrls: ['./abono-capital.page.scss'],
})
export class AbonoCapitalPage implements OnInit {

  desarrollos : Desarrollo[] = [];
  usuario : Usuario = null;
  sel_desarrollo: number;
  desarrollo_id : number;
  amount : string;
  uri_payment : string;
  showCard: boolean = false;
  first_des : number;
  value:any;

  formPayment: FormGroup;

  constructor(
    private mundusApiService: MundusApiService,
    private localService: LocalService,
    private toasCtrl: ToastController
  ) { }

  ngOnInit() {
    this.formPayment = new FormGroup({
      desarrollo: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });

    this.localService.getObject("usuario").then( result => {
      this.usuario = JSON.parse(result.value);  
      this.getDesarrollosByUser(this.usuario.id);
    });
  }

  public getDesarrollosByUser(user_id: number){
    this.mundusApiService.getDesarrollosByUser({user_id: user_id}).subscribe(response => {
      this.desarrollos = response;
      this.first_des = response[0].id_desarrollo_lote;
    })
  }

  public paymentAmount() {
    if(this.formPayment.controls.amount.value != '' && this.formPayment.controls.amount.value != undefined){
      this.desarrollo_id = this.formPayment.controls.desarrollo.value;
      this.amount = this.formPayment.controls.amount.value;
      this.amount = this.amount.replace(/,/g, "");
      this.mundusApiService.paymentCapital({desarrollo: this.desarrollo_id, importe: this.amount, user_id: this.usuario.id})
          .subscribe(response => {
            if(response == 0){
              this.showCard = false;
   
            }else{
               this.uri_payment = response.uri_payment[0];
               this.showPaymentCard();
            }
            
          });
    }else{
      this.showToast('Ingrese el importe que desea abonar.');
    }
  }


  public showPaymentCard(){
    this.showCard = true;
  }

  private async showToast( message: string ) {
    const toast = await this.toasCtrl.create({ message, duration: 3000, position: 'bottom' });
    await toast.present();
  }

}
