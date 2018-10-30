import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CognitoWebTokenAuthService } from 'src/services/cognito-auth/cognito-web-token-auth.service';
import { NgxSpinnerService } from 'ngx-spinner'
import { TempUserStorageService } from '../../services/temp-user/temp-user-storage.service';
import { Store } from '@ngxs/store';
import { RequestUserSuccessAction, RequestUserFailedActions } from 'src/redux/actions/user.actions';
import { IUser } from 'src/models/user-model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {
  access_token: string
  id_token: string
  messages: string[]
  randomMessage: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cognitoService: CognitoWebTokenAuthService,
    private spinner: NgxSpinnerService,
    private userService: TempUserStorageService,
    private store: Store,
    private _location: Location) {

    this.messages = [
      '418: Tea not found',
      'Q: If you have one 404 error then you add another 404 error, what do you have? A: A bad backend team!',
      'Programmes are like women. No matter how much you get mad about an error, you are always the one who is wrong.',
      'Q: How many programmers does it take to screw in a light bulb? A: None. It\'s a hardware problem.',
      'I � Unicode',
      'Error 404: joke not found',
      '/* please work */',
      '<?php me() ?>'
    ]
  }

  ngOnInit() {
    //show display
    this.spinner.show()
    this.showMessage()
    //get access_token and id_token from url
    this.getWebTokenFromUrl()
    //validate tokens
    this.validateTokens().then(isValid => {
      isValid = true //used for testing delete afterwards!
      if (!isValid)
        window.location.href = "https://login.elance.site"
      else {
        this.setLocalStorage('access_token', this.access_token)
        this.setLocalStorage('id_token', this.id_token)

        this.userService.getTestUser().subscribe(user => {
          if (Object.keys(user).length === 0) {
            this.store.dispatch(new RequestUserFailedActions('User not present in the db'))
            this.router.navigate(['user/create'])
          }
          else {
            this.store.dispatch(new RequestUserSuccessAction(user))
            this.router.navigate([''])
          }
        })
      }
    })
  }

  getWebTokenFromUrl() {
    this.activeRoute.queryParamMap.subscribe(params => {
      this.access_token = params['access_token']
      this.id_token = params['id_token']
    })
  }

  validateTokens(): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
      this.cognitoService.validateTokens([this.access_token, this.id_token]).subscribe(res => {
        let response = res as IValidateTokenResponse
        resolve(response.isValid)
      })
    })
  }

  setLocalStorage(tokenName: string, token: string) {
    localStorage.setItem(tokenName, token)
  }

  getEmailFromToken() {
    let idPayload = this.id_token.split('.')[1]
    let jsonLoad = window.atob(idPayload)
    let idDecoded = JSON.parse(jsonLoad) as IIdToken

    return idDecoded.email
  }

  removeFromStorage(key: string) {
    localStorage.removeItem(key)
  }

  showMessage() {
    let i = this.randomInt(0, this.messages.length)
    this.randomMessage = this.messages[i]
    setInterval(element => {
      let number = i

      while (number === i) {
        number = this.randomInt(0, this.messages.length)
      }

      i = number
      this.randomMessage = this.messages[i]
    }, 5000)
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

export interface IIdToken {
  email: string
}

export interface IValidateTokenResponse {
  isValid: boolean
}