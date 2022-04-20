import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;
  localStorageChanges = new Subject();
  token: any

  constructor() {
    this.localStorage = window.localStorage
  }

  get(key: string) {
    this.token = this.localStorage.getItem(key)
    return JSON.parse(this.token);
  }

  set(key: string, data: any) {
    this.localStorage.setItem(key, JSON.stringify(data));
    this.localStorageChanges.next({
      type: 'set',
      key,
      data
    })
    return true
  }

  clearLocalStorage() {

   
    this.localStorage.removeItem("token")
    return true

  }
}
