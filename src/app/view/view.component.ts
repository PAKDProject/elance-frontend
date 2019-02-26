import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
// import { Subscription } from 'rxjs/Subscription';
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { WebsocketService } from 'src/services/websocket-service/websocket.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  constructor(private _wss: WebsocketService) {
    this._wss.connect().then(() => this._wss.send({ action: "ping", content: "ping" }));
  }
}

