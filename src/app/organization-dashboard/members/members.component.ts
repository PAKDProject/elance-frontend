import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/models/user-model';

@Component({
  selector: 'dashboard-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  @Input('MembersIn') members: IUser[];
  @Input('EditingIn') editing: boolean;

  constructor() { }

  ngOnInit() {
  }

  removeMember(m: IUser) {
    console.log(`Removing Member ${m.fName} ${m.lName}`)
    const index: number = this.members.findIndex(member => {
      return member === m;
    });

    if (index != -1) {
      this.members.splice(index, 1);
    }
  }
}
