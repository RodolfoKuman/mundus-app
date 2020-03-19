import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';

import { Usuario } from '../../interfaces/usuario.interface';
import { Notification } from '../../interfaces/notifications.interface';

import { MundusApiService } from '../../services/mundus-api.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  @ViewChild('lista', {static: false}) lista: IonList;

  public usuario : Usuario = null;
  public notification : Notification;
  public notifications : Notification[] = [];

  constructor(
    private mundusApiService: MundusApiService,
    private localService: LocalService,
  ) { }

  ngOnInit() {
    this.localService.getObject("usuario").then( result => {
      this.usuario = JSON.parse(result.value);  
      this.getNotificationsByUser(this.usuario.id);
    });
  }

  public getNotificationsByUser(user_id){
        
      this.mundusApiService.getNofitications(user_id).subscribe(response => {
        if(response.length > 0){
          response.forEach(notification => {
            this.notification = JSON.parse(notification.data);
            
            this.notifications.push(this.notification);
          });
        }
        console.log(this.notifications);
      }) 
      
  }

  public borrar(){
    console.log('borrado');
    this.lista.closeSlidingItems();
  }

}
