import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';

import { Desarrollo } from '../../interfaces/AccountDetail.interface';
import { Usuario } from '../../interfaces/usuario.interface';
import { HistoryPayment } from '../../interfaces/historyPayment.interface';

import { MundusApiService } from '../../services/mundus-api.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-history-payment',
  templateUrl: './history-payment.page.html',
  styleUrls: ['./history-payment.page.scss'],
})

export class HistoryPaymentPage implements OnInit {

  public desarrollos : Desarrollo;
  public usuario : Usuario = null;
  public sel_desarrollo: number;
  public desarrollo_id : number;
  public history_payments : HistoryPayment;

  public formHistory: FormGroup;

  constructor(
      private mundusApiService: MundusApiService,
      private localService: LocalService,
      private toasCtrl: ToastController
  ) { }

  ngOnInit() {
    this.formHistory = new FormGroup({
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
    })
  }

  public getHistoryPaymentByDesarrollo(){
    if(this.formHistory.controls.desarrollo.value != ''){
      this.desarrollo_id = this.formHistory.controls.desarrollo.value;
      this.mundusApiService.getHistoryPayment({sel_desarrollo: this.desarrollo_id}).subscribe(response => {
        this.history_payments = response;
        console.log(this.history_payments);
      })
    }else{
      this.showToast('Debe seleccionar un desarrollo');
    }
  }

  private async showToast( message: string ) {
    const toast = await this.toasCtrl.create({ message, duration: 2000, position: 'bottom' });
    await toast.present();
  }

}
