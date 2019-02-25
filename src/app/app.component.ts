import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/services/websocket-service/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'elance-app-frontend';

  constructor() { }

  ngOnInit() {
  }
}
