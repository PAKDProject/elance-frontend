import { Component, Input, Inject, OnInit } from '@angular/core';
import { ISkill, IUser } from 'src/app/models/user-model';
import { TempUserStorageService } from '../../temp-user-storage.service'

@Component({
  selector: 'skills-modal',
  templateUrl: './skills-modal.component.html',
  styleUrls: ['./skills-modal.component.scss']
})
export class SkillsModalComponent implements OnInit {
  @Input('SkillItem') skill: ISkill
  user: IUser

  constructor(private userService: TempUserStorageService) {}

  ngOnInit() {
    this.user = this.userService.getUser()

    this.skill = this.user.skills[0]
  }
}
