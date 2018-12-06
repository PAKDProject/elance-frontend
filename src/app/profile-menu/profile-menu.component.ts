import { Component, OnInit } from "@angular/core";
import { IUser, IEducationItem, ISocialLink } from "src/models/user-model";
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";
import { UserState } from "src/redux/states/user.state";
import { ISkills } from "src/models/skill-model";
import { NotificationService } from "src/services/notifications/notification.service";

@Component({
  selector: "app-profile-menu",
  templateUrl: "./profile-menu.component.html",
  styleUrls: ["./profile-menu.component.scss"]
})
export class ProfileMenuComponent implements OnInit {
  @Select(UserState.getUser) user$: Observable<IUser>;
  skills: ISkills[];
  educationItems: IEducationItem[];
  socialLinks: ISocialLink[];

  constructor(private _notify: NotificationService) {}

  ngOnInit() {
    this.user$.subscribe(element => {
      this.skills = element.skills;
      this.educationItems = element.educationItems;
      this.socialLinks = element.socialLinks;
    });
  }

  editing: boolean = false;
  toggleEditing() {
    this.editing = !this.editing;
  }

  removeSkill(rSkill) {
    console.log("removing skill: " + rSkill);
    const index: number = this.skills.indexOf(rSkill);
    if (index !== -1) {
      this.skills.splice(index, 1);
    }
  }

  updateSkills(updatedSkill: ISkills) {
    console.log("Updating skill: " + updatedSkill.skillTitle);

    this.skills.forEach(skill => {
      if (skill.skillTitle === updatedSkill.skillTitle) {
        skill = updatedSkill;
      }
    });

    this._notify.showSuccess(
      "Brilliant!",
      `Your new ${updatedSkill.skillTitle} level has been saved!`
    );
    //Alan- Do Redux plox
    console.log(this.skills);
  }

  summaryEdit: boolean = false;
  toggleEditSummary() {
    this.summaryEdit = !this.summaryEdit;
  }
}
