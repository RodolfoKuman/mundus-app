import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../interfaces/usuario.interface';
import { LocalService } from '../../services/local.service';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import { MundusApiService } from '../../services/mundus-api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public usuario : Usuario = null;
  public formPerfil: FormGroup;

  constructor(
    private mundusApiService: MundusApiService,
    private localService: LocalService,
    private toasCtrl: ToastController
    ) { }

  ngOnInit() {
    this.formPerfil = new FormGroup({
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required)
    });
    this.localService.getObject("usuario").then( result => {
      
      this.usuario = JSON.parse(result.value);
      
    });
    
  }

  public setPassport() {
    let password = this.formPerfil.controls.password.value;
    let password_confirmation = this.formPerfil.controls.password_confirmation.value;


    //this.showToast('Contraseña actualizada');
    if(password != password_confirmation){
      this.showToast('Las contraseñas no coinciden');
    }else if (password == '' || password_confirmation == ''){
      this.showToast('Debe llenar todos los campos');
    }
    else{
      //LLamar al servicio 
        this.mundusApiService.updatePassword({user_id: this.usuario.id, password: password, password_confirmation: password_confirmation})
          .subscribe(response => {
    
            if(response){
              this.showToast("Contraseña actualizada");
            }else{
              this.showToast('Ocurrio un error, intente mas tarde');
            }
            
          });  
    }
  }

  private async showToast( message: string ) {
      const toast = await this.toasCtrl.create({ message, duration: 1500 });
      await toast.present();
  }

}
