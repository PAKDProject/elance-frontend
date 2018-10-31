import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/user-model';
import { IValidateTokenResponse } from 'src/app/login-callback/login-callback.component';

@Injectable({
  providedIn: 'root'
})
export class CognitoWebTokenAuthService {
  url: string
  constructor(private _http: HttpClient) {
    this.url = "http://localhost:3000/"
  }

  validateTokens(jwt: string[]): Observable<IValidateTokenResponse> {
    return new Observable<IValidateTokenResponse>((subscriber) => {
      //   let isValid = true

      //   jwt.forEach(element => {
      //     if (element === undefined)
      //       isValid = false
      //   })

      //   subscriber.next({
      //     isValid
      //   })
      // }) // used for testing jwt and redirect

      subscriber.next({
        isValid: true
      })// used for bypassing the callback -- all other testing 

      // return this._http.post<IValidateTokenResponse>(this.url + 'auth/validatetoken', { tokens: jwt });
    }
  }
}