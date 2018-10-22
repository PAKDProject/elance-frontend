import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CognitoWebTokenAuthService } from '../cognito-web-token-auth.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {
  jwt: string
  messages: string[]
  constructor(private router: Router, private activeRoute: ActivatedRoute, private cognitoService: CognitoWebTokenAuthService) { 
    this.messages = [
      '418: Tea not found',
      'Q: If you have one 404 error then you add another 404 error, what do you have? A: A bad backend team!'
    ]
  }

  ngOnInit() {
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
}

export interface IEmail {
  email: string
}