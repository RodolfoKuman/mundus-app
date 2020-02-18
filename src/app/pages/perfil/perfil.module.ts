import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';


@NgModule({
  imports: [
    CommonModule,
    PerfilRoutingModule
  ],
  declarations: [PerfilPage]
})
export class PerfilModule { }
