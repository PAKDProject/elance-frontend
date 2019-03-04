import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
// import { Subscription } from 'rxjs/Subscription';
import { Subscription, Observable } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { WebsocketService, IMessage } from 'src/services/websocket-service/websocket.service';
import { Select, Store } from '@ngxs/store';
import { UserState } from 'src/redux/states/user.state';
import { IUser } from 'src/models/user-model';
import { JobsState } from 'src/redux/states/job.state';
import { SetFuccingJobsToTrue } from 'src/redux/actions/job.actions';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  @Select(JobsState.getIsLoading)
  isLoading$: Observable<boolean>

  @Select(UserState.getUser)
  user$: Observable<IUser>

  user: IUser
  constructor(private _wss: WebsocketService) { }
}

