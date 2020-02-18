import { Component, OnInit } from '@angular/core';

import { Platform, NavController, IonMenu, MenuController  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: '/folder/Inbox',
      icon: 'home'
    },
    {
      title: 'Estado de cuenta',
      url: '/estado-cuenta',
      icon: 'wallet'
    },
    {
      title: 'Pagar mensualidad',
      url: '/folder/Outbox',
      icon: 'card'
    },
    {
      title: 'Historial de pagos',
      url: '/folder/Favorites',
      icon: 'list'
    },
    {
      title: 'Mi perfil',
      url: '/folder/Archived',
      icon: 'person'
    },
    {
      title: 'Cerrar sesion',
      url: '/folder/Archived',
      icon: 'log-out'
    }
  ];
  //public labels = ['Cerrar sesion'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
