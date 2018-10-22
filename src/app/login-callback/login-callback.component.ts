import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CognitoWebTokenAuthService } from '../cognito-web-token-auth.service';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {
  jwt: string
  messages: string[]
  randomMessage: string;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private cognitoService: CognitoWebTokenAuthService, private spinner: NgxSpinnerService) { 
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
    this.spinner.show();
    this.showMessage();
    this.getWebTokenFromUrl()
    this.getUserDataFromToken(this.jwt).then(email => {
      this.getUserData(email).then(() => {
        setTimeout(() => this.router.navigate(['user-dashboard']), 7000)
      })
    })
  }

  getWebTokenFromUrl() {
    this.activeRoute.params.subscribe(params => {
      this.jwt = params['jwt'].toString()
    })
    console.log(this.jwt)
  }

  async getUserDataFromToken(jwt: string) { 
    let email
    await this.cognitoService.getCognitoDetails(jwt).subscribe(res => {
      let response = res as IEmail
      email = response.email
    })
    return email
  }

  async getUserData(email: string) {
    await this.cognitoService.getUserDetails(email).subscribe()
  }

  showMessage() {
    let i = this.randomInt(0, this.messages.length)
    this.randomMessage = this.messages[i]
    setInterval(element => {
      let number = i

      while(number === i)
      {
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

export interface IEmail {
  email: string
}