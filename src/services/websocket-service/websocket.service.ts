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
import { AddRecommendedJobs, SetFuccingJobsToTrue, SetFuccingErrorToTrue } from 'src/redux/actions/job.actions';
import { IJob } from 'src/models/job-model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private config: IWebConfig
  private wss: WebSocketSubject<IMessage>

  private user: IUser

  @Select(UserState.getUser) user$: Observable<IUser>

  constructor(private _notifier: NotificationService, private _http: HttpClient, private _store: Store) {
    this.getConfig().then(res => {
      this.config = res.config
    })
    this.user$.subscribe(user => this.user = user)
  }

  async delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

  getInstance(): Promise<WebSocketSubject<IMessage>> {
    return new Promise((resolve, reject) => {
      if (!this.wss) {
        if (this.config === undefined) {
          let i = 1
          let timer = setInterval(() => {
            if (this.config !== undefined) {
              this.createSocket()
              clearInterval(timer)
              resolve(this.wss)
            }
            i += 1
          }, 100)
        }
        else {
          this.createSocket()
          resolve(this.wss)
        }
      }
      else {
        resolve(this.wss)
      }
    })

  }

  createSocket() {
    this.wss = new WebSocketSubject(`wss://${this.config.endpoint}?userId=${this.user.id}`)

    this.wss.subscribe(obs => {
      console.log(obs)
      switch (obs.action) {
        case "message":
          this.saveMessage(obs.content);
          break;
        case "fuccJobs":
          this.saveFuccJobs(obs.content)
          break;
        case "error":
          console.log(obs.content)
          this._store.dispatch(new SetFuccingErrorToTrue())
          break;
      }
    })
  }

  saveMessage(content: IInstantMessage) {
    try {
      this._store.dispatch(new AddMessageToState(content))
    } catch (error) {
      console.error(error)
    }
  }

  saveFuccJobs(content: IJob[]) {
    try {
      this._store.dispatch(new AddRecommendedJobs(content))
    } catch (error) {
      console.error(error)
    }
  }

  async getConfig(): Promise<{ config: IWebConfig }> {
    return this._http.get<{ config: IWebConfig }>(`${environment.backendUrl}/fucc/getconfig`).toPromise()
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