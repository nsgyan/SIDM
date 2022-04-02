import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;
  localStorageChanges = new Subject();

  constructor() {
    this.localStorage = window.localStorage
  }

  get(key: string) {
    return JSON.parse(this.localStorage.getItem(key));
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
    //   if (this.localStorage.token) {
    //     this.localStorage.clear()
    //     return true
    //   }
    //   return false
    // }
  }
}
