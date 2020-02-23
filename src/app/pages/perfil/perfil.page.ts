import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../interfaces/usuario.interface';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public usuario : Usuario = null;

  constructor(private localService: LocalService) { }

  ngOnInit() {
    this.localService.getObject("usuario").then( result => {
      
      this.usuario = JSON.parse(result.value);
      console.log(this.usuario);  
    });
    
  }
}
