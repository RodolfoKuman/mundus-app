import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavController, MenuController } from '@ionic/angular';

import { LocalService } from '../services/local.service';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  public token : string;

  constructor(
    private localService : LocalService,
    private navController: NavController,
    private menuCtrl: MenuController
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.localService.getObject("token").then( result => {
       this.token = JSON.parse(result.value);  
    });

    let request = req;

    if (this.token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ this.token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.menuCtrl.enable(false);
          this.navController.navigateRoot('/login');
        }

        return throwError( err );

      })
    );

  }

}