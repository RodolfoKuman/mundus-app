import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalResponse } from '../interfaces/responses.interface';

const URL_API = environment.urlAPI;

@Injectable({
  providedIn: 'root'
})
export class MundusApiService {

  constructor(private http: HttpClient) { 

  }

  private buildQuery<T>( method: string, path: string, params?: any, headers?: any ) {
    switch ( method.toLocaleLowerCase() ) {
      case 'get': return this.http.get<T>(URL_API.concat(path), { headers });
      case 'post': return this.http.post<T>(URL_API.concat(path), params);
      case 'put': return this.http.put<T>(URL_API.concat(path), params);
      case 'delete': return this.http.delete<T>(URL_API.concat(path));
    }
  }

  //PRUEBAS

  public getPost(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  public getProductos(limit: number, offset: number): Observable<GlobalResponse> {
    return this.buildQuery('get', `products/limit/${limit}/offset/${offset}`);
  }

  //USUARIOS

  public loginUser( params: { email: string; password: string; } ): Observable<any> {
    return this.buildQuery('post', 'auth/login', params);
  }

  public getUserLoged( token: string ): Observable<any> {
    return this.buildQuery('get', 'auth/user', null, {
      Authorization: 'Bearer '.concat(token)
    });
  }

  //Desarrollos

  public getAccountDetail(params: { sel_desarrollo : number; }): Observable<any> {
    return this.buildQuery('post', 'customer/account_detail', params);
  }

  public getDesarrollosByUser(params: { user_id : number; }): Observable<any> {
    return this.buildQuery('post', 'customer/getDesarrollosByClient', params);
  }
 

}
