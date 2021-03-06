import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';

import { Desarrollo } from '../../interfaces/AccountDetail.interface';
import { Usuario } from '../../interfaces/usuario.interface';

import { MundusApiService } from '../../services/mundus-api.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.page.html',
  styleUrls: ['./mantenimiento.page.scss'],
})
export class MantenimientoPage implements OnInit {

  desarrollos : Desarrollo[] = [];
  usuario : Usuario = null;
  sel_desarrollo: number;
  desarrollo_id : number;
  meses:Array<string>;
  periodo = new Date().toISOString();
  uri_payment : string;
  first_des : number;

  showCard: boolean = false;

  formPayment: FormGroup;
  constructor(
    private mundusApiService: MundusApiService,
    private localService: LocalService,
    private toasCtrl: ToastController
  ) { }

  ngOnInit() {
    this.formPayment = new FormGroup({
      desarrollo: new FormControl('', Validators.required)
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

  public paymentMtto() {
    if(this.formPayment.controls.desarrollo.value != ''){
      this.desarrollo_id = this.formPayment.controls.desarrollo.value;
      this.mundusApiService.paymentMtto({desarrollo: this.desarrollo_id, year: this.periodo.substring(0,4), user_id: this.usuario.id})
          .subscribe(response => {
            if(response == 0){
              this.showCard = false;
              this.showToast('No tiene un adeudo en este periodo');
            }else{
              this.uri_payment = response.uri_payment[0];
              this.showPaymentCard();
            }
            
          });
    }else{
      this.showCard = false;
      this.showToast('Debe seleccionar un desarrollo');
    }
  }

  public showPaymentCard(){
    this.showCard = true;
  }

  public dateChanged(date) {
    this.periodo = date.detail.value;
  }

  private async showToast( message: string ) {
    const toast = await this.toasCtrl.create({ message, duration: 2000, position: 'bottom' });
    await toast.present();
  }

}
