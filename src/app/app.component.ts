import { Component, OnInit } from '@angular/core';

import { Platform, NavController, IonMenu, MenuController  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MundusApiService } from './services/mundus-api.service';
import { LocalService } from './services/local.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public token : string;
  public id;
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Estado de cuenta',
      url: '/estatus-cuenta',
      icon: 'wallet'
    },
    {
      title: 'Pagar mensualidad',
      url: '/payments',
      icon: 'card'
    },
    {
      title: 'Historial de pagos',
      url: '/history-payment',
      icon: 'list'
    },
    {
      title: 'Notificaciones',
      url: '/notifications',
      icon: 'notifications'
    },
    {
      title: 'Mi perfil',
      url: '/perfil',
      icon: 'person'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navController: NavController,
    private localService : LocalService,
    private mundusApiService : MundusApiService,
    private menuCtrl: MenuController,
    private oneSignal: OneSignal
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      /* Configuracion notificaciones */ 
      this.oneSignal.startInit("439030c6-fbc8-4973-a6ae-71aa0ec031bb", "1085109999777");

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert)

      this.oneSignal.setSubscription(true);

      this.oneSignal.getIds()
        .then((ids)=> {
          this.id = ids.pushToken;
          this.token = ids.pushToken;
        })

      this.oneSignal.handleNotificationReceived().subscribe( ()=> {

      })

      this.oneSignal.handleNotificationOpened().subscribe( (data)=> {
        console.log(data);
        console.log(data.notification.payload.body); //Recuperando info de las notificaciones
      })

      this.oneSignal.endInit();
      /* ****************************** */ 
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.validateLoged();
    });
  }

  ngOnInit() {
    const path = '/home';
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  private validateLoged(): void {
    this.localService.getObject('usuario').then( data => {
      if ( data.value != null ) {       
        this.navController.navigateRoot('/home');    
      } else {
        this.navController.navigateRoot('/login');
      }
    });
  }

  public cerrarSesion(): void {
    this.localService.getObject("token").then( result => {
      this.token = JSON.parse(result.value);  
      this.logout(this.token);
    });
  }

  public logout(token: string){
      this.mundusApiService.logout(token).subscribe(response => {
      this.localService.clearStorage();
      this.menuCtrl.enable(false);
      this.navController.navigateRoot('/login');  
    })
  }

}
