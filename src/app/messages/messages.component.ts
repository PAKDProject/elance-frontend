import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IUser } from 'src/models/user-model';
import { Select, Store } from "@ngxs/store";
import { UserState } from "src/redux/states/user.state";
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMessage } from 'src/models/message-model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user-service/user.service';
import { WebsocketService } from 'src/services/websocket-service/websocket.service';
import { MessageState } from 'src/redux/states/message.state';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  contactsShown: boolean = true;
  @ViewChild('messages') private messagesContainer: ElementRef;

  @Select(UserState.getUser)
  user$: Observable<IUser>;
  @Select(MessageState.getMessages) messages$: Observable<IMessage[]>;

  selectedContact: IUser;

  messageForm: FormGroup =
    new FormGroup({
      message: new FormControl('', Validators.required)
    })

  constructor(private store: Store,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    console.info(id)
    if (id) {
      this.userService.getUserByID(id).subscribe(
        res => { this.selectedContact = res; console.log(this.selectedContact) })
    }
    // this.messages$.subscribe(mes => {
    //   this.sampleConversation = mes
    // }) getting messages
  }

  toggleContacts() { this.contactsShown = !this.contactsShown }

  openProfile() { }

  openMessenger(contact: IUser) {
    this.selectedContact = contact
  }

  //TEMP
  sampleConversation: IMessage[] = [ //]
    {
      content: 'Hello',
      isSeen: true,
      recipientId: 'user1',
      senderId: 'sad34324-d73fsadas-DAB4GSUS-b801-42069LOL',
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
