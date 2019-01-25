import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/models/user-model';

@Component({
  selector: 'dashboard-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @Input('ContactsIn') contacts: IUser[];

  constructor() { }

  ngOnInit() {
  }

}
