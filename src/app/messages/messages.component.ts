import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IUser } from 'src/models/user-model';
import { Select, Store } from "@ngxs/store";
import { UserState } from "src/redux/states/user.state";
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMessage } from 'src/models/message-model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @ViewChild('messages') private messagesContainer: ElementRef;

  @Select(UserState.getUser)
  user$: Observable<IUser>;

  selectedContact: IUser;

  messageForm: FormGroup =
    new FormGroup({
      message: new FormControl('', Validators.required)
    })

  constructor(private store: Store) { }

  ngOnInit() { }

  openProfile() {
  }

  openMessenger(contact: IUser) {
    this.selectedContact = contact
  }

  //TEMP
  sampleConversation: IMessage[] = [
    {
      content: 'Hello',
      isSeen: true,
      recipientId: 'user1',
      senderId: 'user2',
      timestamp: new Date()
    },
    {
      content: 'Hi',
      isSeen: true,
      recipientId: 'user2',
      senderId: 'user1',
      timestamp: new Date()
    },
    {
      content: 'Who are you?',
      isSeen: true,
      recipientId: 'user1',
      senderId: 'user2',
      timestamp: new Date()
    },
    {
      content: 'My name a Jeff',
      isSeen: true,
      recipientId: 'user2',
      senderId: 'user1',
      timestamp: new Date()
    },
    {
      content: 'What is this place?',
      isSeen: true,
      recipientId: 'user1',
      senderId: 'user2',
      timestamp: new Date()
    },
    {
      content: 'This is intellilance, the greatest job site ever created',
      isSeen: true,
      recipientId: 'user2',
      senderId: 'user1',
      timestamp: new Date()
    },
    {
      content: "My God, It's beautiful",
      isSeen: false,
      recipientId: 'user1',
      senderId: 'user2',
      timestamp: new Date()
    },
    {
      content: 'You have been chosen to be a part of an elite group of frelancers who can get jobs easily at the click of a button',
      isSeen: true,
      recipientId: 'user2',
      senderId: 'user1',
      timestamp: new Date()
    },
    {
      content: "Cool beans",
      isSeen: false,
      recipientId: 'user1',
      senderId: 'user2',
      timestamp: new Date()
    }
  ]
}
