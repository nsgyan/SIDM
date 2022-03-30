import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpService: HttpClient) { }

  postregistrationForm(formData: any) {
    return this.httpService.post('http://localhost:3000/regester', formData);
  }
}
