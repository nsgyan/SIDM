import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;

        }
        console.log(errorMessage);
        alert('No Internet Connectivity found.')
        if(this.localStorage.get('type')==='admin'){
          window.location.href="/login/admin"
          return throwError(errorMessage);
        }
         else if(!this.localStorage.get('token') && this.localStorage.get('type')==='member'){
          window.location.href="/login/member"
          return throwError(errorMessage);
         }
      
        return throwError(errorMessage);
      })
    );
  }
}
