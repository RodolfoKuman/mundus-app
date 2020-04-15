import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';

import { AcountDetail } from '../../interfaces/AccountDetail.interface';
import { Desarrollo } from '../../interfaces/AccountDetail.interface';
import { Usuario } from '../../interfaces/usuario.interface';

import { MundusApiService } from '../../services/mundus-api.service';
import { LocalService } from '../../services/local.service';

const URL_API = environment.urlAPI;

@Component({
  selector: 'app-estatus-cuenta',
  templateUrl: './estatus-cuenta.page.html',
  styleUrls: ['./estatus-cuenta.page.scss'],
})

export class EstatusCuentaPage implements OnInit {

  public desarrollos : Desarrollo[] = [];
  public usuario : Usuario = null;
  public acountDetail : AcountDetail[] = [];
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

  public getAccountStatus(){
    if(this.formAcountData.controls.desarrollo.value != ''){
      this.desarrollo_id = this.formAcountData.controls.desarrollo.value;

      const browser = this.iab.create(`${URL_API}customer/generate_pdf_for_app/desarrollo/${this.desarrollo_id}`, '_system' );

    }else{
      this.showToast('Debe seleccionar un desarrollo');
    }
  } 

  private async showToast( message: string ) {
    const toast = await this.toasCtrl.create({ message, duration: 2000, position: 'bottom' });
    await toast.present();
  }

}
