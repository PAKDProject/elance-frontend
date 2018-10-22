import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {
  jwt: string
  messages: string[] = ["418: Tea not found", "Q: If you have one 404 error then you add another 404 error, what do you have? A: A bad backend team!"];
  randomMessage: string = this.messages[0];

  constructor(private router: Router, private activeRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.setMessages();
    this.activeRoute.params.subscribe(params => {
      this.jwt = params['jwt'].toString()
    })
  }

  getWebToken() {

  }
  async setMessages() {
    let i = 0
    setTimeout(element => {
      if (i === 0) {
        this.randomMessage = this.messages[i]
        i = 1;
      }
      else {
        this.randomMessage = this.messages[i]
        i = 0
      }
      console.log(this.randomMessage)
    }, 1000)
  }
}
