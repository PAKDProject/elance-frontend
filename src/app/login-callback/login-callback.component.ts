import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CognitoWebTokenAuthService } from '../cognito-web-token-auth.service';
import { NgxSpinnerService } from 'ngx-spinner'
import { TempUserStorageService } from '../temp-user-storage.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {
  jwt: string
  messages: string[]
  randomMessage: string;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private cognitoService: CognitoWebTokenAuthService, private spinner: NgxSpinnerService, private userService: TempUserStorageService) {
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
    this.spinner.show()
    this.showMessage()
    this.getWebTokenFromUrl()
    this.getUserDataFromToken(this.jwt).then(data => {
      this.setLocalStorage("id_token", this.jwt)
      let email = data as string
      this.setLocalStorage("email", email)
      this.getUserData(email).then(data => {
        if (data !== undefined) {
          this.removeFromStorage("email")
          this.userService.setUser(data)
          this.router.navigate(['user-dashboard'])
        }
        else {
          this.router.navigate(['user/create'])
        }
      })
    })
  }

  getWebTokenFromUrl() {
    this.activeRoute.params.subscribe(params => {
      this.jwt = params['jwt'].toString()
    })
  }

  getUserDataFromToken(jwt: string) {
    return new Promise((resolve, reject) => {
      this.cognitoService.getCognitoDetails(jwt).subscribe(res => {
        let response = res as IIdToken
        console.log(response)
        resolve(response.email)
      })
    })
  }

  getUserData(email: string) {
    return new Promise(resolve => {
      this.cognitoService.getUserDetails(email).subscribe(data => {
        resolve(data)
      }, err => {
        resolve(undefined)
      })
    })
  }

  setLocalStorage(tokenName: string, token: string) {
    localStorage.setItem(tokenName, token)
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