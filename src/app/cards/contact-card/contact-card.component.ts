import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/models/user-model';

@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  @Input('ContactInput') contact: IUser;

  constructor() { }

  ngOnInit() {
  }

}
