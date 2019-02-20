import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket'
import { NotificationService } from '../notifications/notification.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/models/user-model';
import { Select, Store } from '@ngxs/store';
import { UserState } from 'src/redux/states/user.state';
import { Observable } from 'rxjs';
import { AddMessageToState } from 'src/redux/actions/message.actions';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<IMessage>
  private config: IWebConfig
  private isConnected: boolean = false
  private user: IUser

  @Select(UserState.getUser) user$: Observable<IUser>


  constructor(private _notifier: NotificationService, private _http: HttpClient, private _store: Store) {
    this.user$.subscribe(user => {
      this.user = user
      this.connect()
    })
  }

  connect() {
    let timer = setInterval(async () => {
      try {
        if (this.config === undefined) {
          this.config = await this.getConfig()
        }

        this.socket$ = await WebSocketSubject.create(`${this.config.endpoint}?userId=${this.user.id}`)
        this.socket$.subscribe(message => {
          this._store.dispatch(new AddMessageToState(message))
        }, err => {
          this._notifier.showError("Something went wrong with the connection...")
        })

        clearInterval(timer)
      } catch (error) {
        this._notifier.showError("Failed connection!", "Failed to connect to FUCC system. Retrying in 15 seconds...")
        console.log(error) //used for dev
      }
    }, 15000)
  }

  async getConfig(): Promise<IWebConfig> {
    return this._http.get<IWebConfig>(`${environment.backendUrl}/fucc/getConfig`).toPromise()
  }
}

interface IMessage {
  action: string
  userId: string
  senderUserId: string
  content: string
}

interface IWebConfig {
  endpoint: string
  createdOn: number
}

export interface IInstantMessage {
  senderId?: string
  recipentId?: string
  content?: string
  isSeen?: boolean
  timestamp?: number
  action: string
}