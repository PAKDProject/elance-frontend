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
  randomMessage: string = this.messages[0];

  constructor(private router: Router, private activeRoute: ActivatedRoute, private cognitoService: CognitoWebTokenAuthService, private spinner: NgxSpinnerService) { 
    this.messages = [
      '418: Tea not found',
      'Q: If you have one 404 error then you add another 404 error, what do you have? A: A bad backend team!'
    ]
  }

  ngOnInit() {
    this.spinner.show();
    this.getWebTokenFromUrl()
    this.getUserDataFromToken(this.jwt).then(email => {
      
    })
  }

  getWebTokenFromUrl() {
    this.activeRoute.params.subscribe(params => {
      this.jwt = params['jwt'].toString()
    })
  }

  async getUserDataFromToken(jwt: string) { 
    let email
    await this.cognitoService.getCognitoDetails(jwt).subscribe(res => {
      let response = res as IEmail
      response.email = email
    })
    return email
  }

  getUserData(email: string) {
    this.cognitoService.getUserDetails(email)
  }
}

export interface IEmail {
  email: string
}