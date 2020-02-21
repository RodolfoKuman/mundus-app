import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController, LoadingController, ToastController} from '@ionic/angular';

import {LocalService} from '../../services/local.service';
import {MundusApiService} from '../../services/mundus-api.service';
import {Usuario} from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public formLogin: FormGroup;

  constructor(
   // private events: Events,
   private navController: NavController,
    private localService: LocalService,
    private mundusApiService: MundusApiService,
    private loadingCtrl: LoadingController,
    private toasCtrl: ToastController
  ) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+')]),
      password: new FormControl('', Validators.required)
    });
  }

  public async enterApp() {
    const  loading = await this.loadingCtrl.create();
    await loading.present();
    this.mundusApiService.loginUser({
        email: this.formLogin.controls.email.value,
        password: this.formLogin.controls.password.value
    }).subscribe( response => {
        this.mundusApiService.getUserLoged( response.access_token ).subscribe( (user: Usuario) => {
            this.localService.saveObject('usuario', user);
            loading.dismiss();
            this.navController.navigateRoot('/home');
            //this.events.publish('login:event', true);
        });
    }, error => {
        console.log(error);
        loading.dismiss();
        this.showToast('Usuario o contraseña incorrectos');
    });
  }

  private async showToast( message: string ) {
      const toast = await this.toasCtrl.create({ message, duration: 1500 });
      await toast.present();
  }

}
