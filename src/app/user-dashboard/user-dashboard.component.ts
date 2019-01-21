import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/models/user-model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  contacts: IUser[]

  constructor() { }

  ngOnInit() { }

}
