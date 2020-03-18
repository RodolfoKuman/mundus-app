import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  @ViewChild('lista', {static: false}) lista: IonList;

  constructor() { }

  ngOnInit() {
  }

  public borrar(){
    console.log('borrado');
    this.lista.closeSlidingItems();
  }

}
