import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user-model';
import { TempUserStorageService } from '../temp-user-storage.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {
  user: IUser
  constructor(private userService: TempUserStorageService) { }

  ngOnInit() {
    this.user = this.userService.getUser()
  }

  openSocial() {
    
  }

}
