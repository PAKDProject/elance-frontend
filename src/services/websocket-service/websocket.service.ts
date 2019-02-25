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
  private ws: WebSocket
  private user: IUser

  @Select(UserState.getUser) user$: Observable<IUser>


  constructor(private _notifier: NotificationService, private _http: HttpClient, private _store: Store) {
    this.user$.subscribe(user => {
      this.user = user
      this.connect(null)

      if (this.ws === undefined) {
        let timer = setInterval(async () => {
          this.connect(timer)
        }, 15000)
      }
    })
  }

  async connect(timer) {
    try {
      if (this.config === undefined) {
        let res = await this.getConfig()
        this.config = res.config
      }
      this.ws = new WebSocket(`wss://${this.config.endpoint}?userId=${this.user.id}`)
      this.ws.onopen = () => this._notifier.showSuccess('Connected!', "Successfully connected to FUCC System.")
      this.ws.onmessage = (event) => {
        let message: IMessage = JSON.parse(event.data)
        if (message.action === "message") {
          let im = message.content as IInstantMessage
          //let im = message as IInstantMessage
          this._store.dispatch(new AddMessageToState(im))
        }
        else if (message.action === "fuccJobs") {

        }
      }
      this.ws.onerror = () => {
        throw new Error("Error with connection")
      }

      if (timer !== null) clearInterval(timer)
    } catch (error) {
      this._notifier.showError("Failed connection!", "Failed to FUCC the system. Retrying in 15 seconds...")
    }
  }

  async getConfig(): Promise<{ config: IWebConfig }> {
    return this._http.get<{ config: IWebConfig }>(`${environment.backendUrl}/fucc/getconfig`).toPromise()
  }

  async send(message: IMessage) {
    this.ws.send(JSON.stringify(message))
  }
}

export interface IMessage {
  action: string
  userId?: string
  senderUserId?: string
  content: any
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
}