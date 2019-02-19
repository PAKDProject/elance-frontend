import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/models/user-model';
import { Select, Store } from "@ngxs/store";
import { UserState } from "src/redux/states/user.state";
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @Select(UserState.getUser)
  user$: Observable<IUser>;

  selectedContact: IUser;

  messageForm: FormGroup =
    new FormGroup({
      message: new FormControl('', Validators.required)
    })

  constructor(private store: Store) { }

  ngOnInit() {}



  openProfile() {
  }

  openMessenger(contact: IUser) {
    this.selectedContact = contact
  }
}
