import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/user-model';
import { IValidateTokenResponse } from 'src/app/login-callback/login-callback.component';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CognitoWebTokenAuthService {
  url: string
  constructor(private _http: HttpClient) {
    this.url = environment.backendUrl
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

      // subscriber.next({
      //   isValid: true
      // })// used for bypassing the callback -- all other testing 

      this._http.post<IValidateTokenResponse>(this.url + 'auth/validatetoken', { tokens: jwt }).subscribe(res => {
        if (res.isValid) {
          subscriber.next({
            isValid: true
          })
        }
        else {
          subscriber.next({
            isValid: false
          })
        }
      }, err => {
        subscriber.next({
          isValid: false
        })
      });
    })
  }

  logout() {
    return this._http.post(this.url + 'auth/logout', {})
  }
}