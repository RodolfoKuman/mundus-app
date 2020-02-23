import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController, LoadingController, ToastController} from '@ionic/angular';

import { AcountDetail } from '../../interfaces/AccountDetail.interface';
import { Desarrollo } from '../../interfaces/AccountDetail.interface';
import { Usuario } from '../../interfaces/usuario.interface';

import { MundusApiService } from '../../services/mundus-api.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public desarrollos : Desarrollo[] = [];
  public usuario : Usuario = null;
  public acountDetail : AcountDetail[] = [];
  public sel_desarrollo: number = 1;
  public desarrollo_id : number;

  public formAcountData: FormGroup;

  constructor(
      private mundusApiService: MundusApiService,
      private localService: LocalService,
      private toasCtrl: ToastController
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

  private async showToast( message: string ) {
    const toast = await this.toasCtrl.create({ message, duration: 2000, position: 'bottom' });
    await toast.present();
  }
  

}
