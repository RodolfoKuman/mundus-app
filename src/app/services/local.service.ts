import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(
    private http: HttpClient
  ) {}

  public saveObject( key: string, value: any ) {
     return Storage.set({ key, value: JSON.stringify(value) });
  }

  public getObject( key: string ) {
    return Storage.get({ key });
  }

  public removeObject( key: string ) {
    Storage.remove({ key });
  }

  async clearStorage() {
    await Storage.clear();
  }

}
