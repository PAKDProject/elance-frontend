import { Injectable, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket'
import { NotificationService } from '../notifications/notification.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/models/user-model';
import { Select, Store } from '@ngxs/store';
import { UserState } from 'src/redux/states/user.state';
import { Observable } from 'rxjs';
import { AddMessageToState, RemoveOnlineMemberFromState, AddOnlineMemberToState } from 'src/redux/actions/message.actions';
import { AddRecommendedJobs, SetFuccingJobsToTrue, SetFuccingErrorToTrue } from 'src/redux/actions/job.actions';
import { IJob } from 'src/models/job-model';
import { CognitoWebTokenAuthService } from '../cognito-auth/cognito-web-token-auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private config: IWebConfig
  private wss: WebSocketSubject<IMessage>
  private messageAudio = new Audio('../../assets/message_arrived.mp4')
  private user: IUser

  @Select(UserState.getUser) user$: Observable<IUser>

  constructor(private _notifier: NotificationService, private _http: HttpClient, private _store: Store, private _authService: CognitoWebTokenAuthService) {
    this.getConfig().then(res => {
      this.config = res.config
      this.createSocket()
      this._notifier.showSuccess("Connected!", "Successfully connected to the Freelance Ultimate Clever Cognition System!")
    }, err => {
      this._notifier.showError("Failed to connect", "Failed to connect to Freelance Ultimate Clever Cognition System! Retrying in 15 seconds...")
      let timer = setInterval(() => {
        this.getConfig().then(res => {
          this.config = res.config
          this.createSocket()
          this._notifier.showSuccess("Connected!", "Successfully connected to the Freelance Ultimate Clever Cognition System!")
          clearInterval(timer)
        }, err => {
          this._notifier.showError("Failed to connect", "Failed to connect to Freelance Ultimate Clever Cognition System! Retrying in 15 seconds...")
        })
      }, 15000)
    })
    this.user$.subscribe(user => this.user = user)
    this.messageAudio.load()
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
      console.log(obs.action)
      switch (obs.action) {
        case "message":
          this.saveMessage(obs.content)
          this.messageAudio.play()
          this._notifier.showInfo("Message", "A new message has just been received!")
          break;
        case "message|old":
          this.saveMessage(obs.content);
          break;
        case "fuccJobs":
          this.saveFuccJobs(obs.content)
          break;
        case "notify|user_online":
          this._store.dispatch(new AddOnlineMemberToState(obs.content.id)).subscribe(res => {
            this._notifier.showInfo("User Online", `${obs.content.fName} ${obs.content.lName} is now Online!`)
          })
          break;
        case "notify|user_offline":
          this._store.dispatch(new RemoveOnlineMemberFromState(obs.content.id)).subscribe(res => {
            this._notifier.showInfo("User Offline", `${obs.content.fName} ${obs.content.lName} is now Offline!`)
          })
          break;
        case "notify|user_already_online":
          this._store.dispatch(new AddOnlineMemberToState(obs.content.id))
          break
        case "fucc|logout":
          this._notifier.showWarning('Another session started you are about to be logged out...')
          this._authService.logout().subscribe(res => {
            console.log('Changing href')
            window.location.href = "http://login.elance.site"
          }, err => {
            this._notifier.showError("Failed to logout!")
          })
          break;
        case "fucc|refresh":
          this._notifier.showWarning("Another session detected, reloading...")
          setTimeout(() => {
            location.reload()
          }, 1000)
        case "error":
          console.log(obs)
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