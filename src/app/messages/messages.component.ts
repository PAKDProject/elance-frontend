import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IUser } from 'src/models/user-model';
import { Select, Store } from "@ngxs/store";
import { UserState } from "src/redux/states/user.state";
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user-service/user.service';
import { WebsocketService, IInstantMessage, IMessage } from 'src/services/websocket-service/websocket.service';
import { MessageState } from 'src/redux/states/message.state';
import { map } from 'rxjs/operators';
import { AddMessageToState } from 'src/redux/actions/message.actions';
import { WebSocketSubject } from 'rxjs/webSocket';

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
  @Select(MessageState.getMessagesForUser) messages$: Observable<IInstantMessage[]>;

  selectedContact: IUser;
  selectedMessages: IInstantMessage[] = []
  user: IUser

  messageForm: FormGroup =
    new FormGroup({
      message: new FormControl('', Validators.required)
    })

  constructor(private store: Store,
    private route: ActivatedRoute,
    private userService: UserService,
    private webSockerService: WebsocketService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    console.info(id)
    if (id && id !== ':id') {
      this.userService.getUserByID(id).subscribe(
        res => { this.selectedContact = res; })
    }
    this.user$.subscribe(user => {
      this.user = user
    })
  }

  toggleContacts() { this.contactsShown = !this.contactsShown; }

  openProfile() {
  }

  openMessenger(contact: IUser) {
    this.selectedContact = contact

    this.store.select(MessageState.getMessagesForUser).pipe(map(res =>
      res(contact.id)
    )).subscribe(res => {
      this.selectedMessages = res
    })
  }

  async sendMessage() {
    let sendingMessage: IInstantMessage = {
      content: this.messageForm.get("message").value,
      senderId: this.user.id,
      recipentId: this.selectedContact.id,
      timestamp: Date.now(),
      isSeen: false
    }

    let wsMessage: IMessage = {
      action: "sendMessage",
      content: sendingMessage.content,
      senderUserId: this.user.id,
      userId: this.selectedContact.id,
    }

    let sender = await this.webSockerService.getInstance()
    sender.next(wsMessage)
    this.store.dispatch(new AddMessageToState(sendingMessage))
  }
}
