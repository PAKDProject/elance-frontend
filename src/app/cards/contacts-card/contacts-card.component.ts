import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/models/user-model';

@Component({
  selector: 'contacts-card',
  templateUrl: './contacts-card.component.html',
  styleUrls: ['./contacts-card.component.scss']
})
export class ContactsCardComponent implements OnInit {
  // @Input('contactsInput') contacts: IUser;
  @Input('contactsInput') contacts = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 ];
  maxContacts = 5;

  constructor() { }

  ngOnInit() {
    this.maxContacts = 5;
  }

  openProfile() {

  }

  openMessenger() {

  }

  showMore() {
    this.maxContacts += 5;
  }
}
