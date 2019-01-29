import { Component, OnInit } from '@angular/core';
import { RegisterFormComponent } from 'src/app/register-form/register-form.component'
import { secret } from 'src/assets/secret';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit {
  secret: string
  constructor() { }

  ngOnInit() {
    let decoded = window.atob(secret.text)
    this.secret = decoded
    this.secret.split('').reverse().toString()
    this.secret.replace('.', '')
    let speech = new SpeechSynthesisUtterance(this.secret)
    window.speechSynthesis.speak(speech)
  }
}