import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';

import { Desarrollo } from '../../interfaces/AccountDetail.interface';
import { Usuario } from '../../interfaces/usuario.interface';

import { MundusApiService } from '../../services/mundus-api.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  public desarrollos : Desarrollo[] = [];
  public usuario : Usuario = null;
  public sel_desarrollo: number;
  public desarrollo_id : number;
  public meses:Array<string>;
  public myDate = new Date().toISOString();

  public formPayment: FormGroup;
  
  constructor(
    private mundusApiService: MundusApiService,
    private localService: LocalService,
    private toasCtrl: ToastController
  ) { }

  ngOnInit() {
    this.meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
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
    })
  }

  public searchPaymentPeriod() {
    if(this.formPayment.controls.desarrollo.value != ''){
      this.desarrollo_id = this.formPayment.controls.desarrollo.value;
  
      //Llamar al servicio para buscar el periodo de pago dado
    }else{
      this.showToast('Debe seleccionar un desarrollo');
    }
  }

  public dateChanged(date) {
    console.log(date);
    console.log(this.myDate);
  }
  

  private async showToast( message: string ) {
    const toast = await this.toasCtrl.create({ message, duration: 2000, position: 'bottom' });
    await toast.present();
  }

}
