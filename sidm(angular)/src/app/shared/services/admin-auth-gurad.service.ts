import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuradService {
  constructor(private localStorage: LocalStorageService,
    private router: Router) { }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.localStorage.get('token')) {
      return this.router.createUrlTree(['login/admin'])
    }
    return true
  }
}
