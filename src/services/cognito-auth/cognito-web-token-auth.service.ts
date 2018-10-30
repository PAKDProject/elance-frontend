import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class CognitoWebTokenAuthService {
  url: string
  constructor(private _http: HttpClient) {
    this.url = "http://localhost:3000/"
  }

  validateTokens(jwt: string[]) {
    return new Observable<boolean>((subscriber) => {
      subscriber.next(true)
    }) // used for testing
    return this._http.post(this.url + 'auth/validatetoken', { tokens: jwt });
  }
}