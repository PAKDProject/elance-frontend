import { Component, OnInit } from '@angular/core';
import { IUser, ISkill, IEducationItem, ISocialLink } from 'src/models/user-model';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { UserState } from 'src/redux/states/user.state';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {
  @Select(UserState.getUser) user$: Observable<IUser>
  skills: ISkill[]
  educationItems: IEducationItem[]
  socialLinks: ISocialLink[]

  constructor() { }

  ngOnInit() {
    this.user$.subscribe(element => {
      this.skills = element.skills
      this.educationItems = element.educationItems
      this.socialLinks = element.socialLinks
    })
  }

}
