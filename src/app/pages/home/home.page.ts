import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AcountDetail } from '../../interfaces/AccountDetail.interface';
import { Desarrollo } from '../../interfaces/AccountDetail.interface';
import { Usuario } from '../../interfaces/usuario.interface';

import { MundusApiService } from '../../services/mundus-api.service';
import { LocalService } from '../../services/local.service';
import { environment } from 'src/environments/environment';

const URL_API = environment.urlAPI;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public desarrollos : Desarrollo;
  public usuario : Usuario = null;
  public acountDetail : AcountDetail;
  public sel_desarrollo: number;
  public desarrollo_id : number;
  public first_des : number;

  public formAcountData: FormGroup;

  constructor(
      private mundusApiService: MundusApiService,
      private localService: LocalService,
      private toasCtrl: ToastController,
      private iab: InAppBrowser
    ) { }

  ngOnInit() {
    this.formAcountData = new FormGroup({
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

  public getAccountDetail(){
    if(this.formAcountData.controls.desarrollo.value != ''){
      this.desarrollo_id = this.formAcountData.controls.desarrollo.value;
      this.mundusApiService.getAccountDetail({sel_desarrollo: this.desarrollo_id}).subscribe(response => {
        this.acountDetail = response[0];
      })
    }else{
      this.showToast('Debe seleccionar un desarrollo');
    }
  } 

  public getContractDesarrollo(){
    if(this.formAcountData.controls.desarrollo.value != ''){
      this.desarrollo_id = this.formAcountData.controls.desarrollo.value;
      let desarrollo_encode = this.encrypt(this.desarrollo_id);
      
      const browser = this.iab.create(`${URL_API}customer/contract_download/${this.usuario.id}/${desarrollo_encode}`, '_system' );

    }else{
      this.showToast('Debe seleccionar un desarrollo');
    }
  } 

  public encrypt(str) {
    var encoded = "";
    for (let i=0; i<str.length;i++) {
        var a = str.charCodeAt(i);
        var b = a ^ 123;    // bitwise XOR with any number, e.g. 123
        encoded = encoded+String.fromCharCode(b);
    }
    return encoded;
  }

  private async showToast( message: string ) {
    const toast = await this.toasCtrl.create({ message, duration: 2000, position: 'bottom' });
    await toast.present();
  }
  

}
