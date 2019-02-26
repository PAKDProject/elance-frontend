import { Injectable, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket'
import { NotificationService } from '../notifications/notification.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/models/user-model';
import { Select, Store } from '@ngxs/store';
import { UserState } from 'src/redux/states/user.state';
import { Observable } from 'rxjs';
import { AddMessageToState } from 'src/redux/actions/message.actions';
import { AddRecommendedJobs } from 'src/redux/actions/job.actions';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnInit {
  private config: IWebConfig
  private isConnected: boolean = false
  private ws: WebSocket
  private user: IUser

  @Select(UserState.getUser) user$: Observable<IUser>


  constructor(private _notifier: NotificationService, private _http: HttpClient, private _store: Store) { }

  ngOnInit() {

  }

  async tryToConnect() {
    try {
      if (this.config === undefined) {
        let res = await this.getConfig()
        this.config = res.config
      }
      this.ws = new WebSocket(`wss://${this.config.endpoint}?userId=${this.user.id}`)
      this.ws.onopen = () => this._notifier.showSuccess('Connected!', "Successfully connected to FUCC System.")
      this.ws.onmessage = (event) => {
        let message: IMessage = JSON.parse(event.data)
        console.log(message)
        if (message.action === "message") {
          let im = message.content as IInstantMessage
          //let im = message as IInstantMessage
          this._store.dispatch(new AddMessageToState(im))
        }
        else if (message.action === "fuccJobs") {
          this._store.dispatch(new AddRecommendedJobs(message.content))
        }
      }
      this.ws.onerror = () => {
        throw new Error("Error with connection")
      }
    } catch (error) {
      throw error
    }
  }
  async connect() {
    this.user$.subscribe(async user => {
      this.user = user
      if (this.ws === undefined) {
        try {
          await this.tryToConnect()
        } catch (error) {
          let timer = setInterval(async () => {
            try {
              await this.tryToConnect()
              clearInterval(timer)
            } catch (error) {
              this._notifier.showError("Failed connection!", "Failed to connect to FUCC. Retrying in 15 seconds...")
              console.log(error)
            }
          }, 15000)
        }
      }
    })
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