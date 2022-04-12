import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenString = this.localStorage.get('token')
    if (tokenString) {
      let tokenReq = req.clone({
        headers: req.headers.set('Authorization', tokenString)
      });
      return next.handle(tokenReq)
    }
    else
      return next.handle(req)
  }
}
