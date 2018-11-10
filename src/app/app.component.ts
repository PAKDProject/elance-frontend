import { Component, OnInit } from '@angular/core';
import { TempJobStorageService } from 'src/services/temp-job/temp-job-storage.service';

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
