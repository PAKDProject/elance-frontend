import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/models/user-model';

@Component({
  selector: 'dashboard-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  @Input('MembersIn') members: IUser[];

  constructor() { }

  ngOnInit() {
  }

}
