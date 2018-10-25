import { Component, OnInit, Input } from '@angular/core';
import { IEducationItem, ISkill, IUser } from 'src/app/models/user-model';
import { TempUserStorageService } from 'src/app/temp-user-storage.service';

@Component({
  selector: 'education-modal',
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.scss']
})
export class EducationModalComponent implements OnInit {
  @Input('EducationItem') edu : IEducationItem

  user: IUser

  
  constructor(private userService: TempUserStorageService) { }

  ngOnInit() {
    this.user = this.userService.getUser()

    this.edu = this.user.educationItems[0]
  }

}
