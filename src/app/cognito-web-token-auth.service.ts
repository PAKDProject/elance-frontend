import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CognitoWebTokenAuthService {
  url: string
  constructor(private _http: HttpClient) { 
    this.url = "http://localhost:3000/"
  }

  getCognitoDetails(jwt: string) {
    return this._http.post(this.url + 'auth/validatetoken', { jwt });
  }

  getUserDetails(email: string) {
    return this._http.get(this.url + email);
  }
}
