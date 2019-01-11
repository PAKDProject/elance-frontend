import { Component, OnInit } from "@angular/core";
import { IUser, IEducationItem, ISocialLink } from "src/models/user-model";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { UserState } from "src/redux/states/user.state";
import { ISkills } from "src/models/skill-model";
import { NotificationService } from "src/services/notifications/notification.service";
import { RequestUpdateUser } from "src/redux/actions/user.actions";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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
  user: Partial<IUser> = {};
  bodyRows = ["About Me", "Education", "Skills"]

  constructor(private _notify: NotificationService, private store: Store) { }

  ngOnInit() {
    this.user$.subscribe(element => {
      this.skills = element.skills;
      this.educationItems = element.educationItems;
      this.socialLinks = element.socialLinks;

      this.user = {
        fName: element.fName,
        lName: element.lName,
        tagline: element.tagline,
        summary: element.summary,
        educationItems: element.educationItems,
        skills: element.skills
      };
    });
  }

  //Draggable components
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.bodyRows, event.previousIndex, event.currentIndex);
  }

  getBodyRowContent(title: string) {
    switch(title)
    {
      case "About Me":
        return this.user.summary;
      case "Education":
        return this.user.educationItems;
      case "Skills":
        return this.user.skills;
    }
  }

  //Editing (general)
  editing: boolean = false;
  toggleEditing() {
    if (this.editing) {
      this.store.dispatch(new RequestUpdateUser(this.user)).subscribe(res => {
        this.editing = !this.editing
      });
    }
    else {
      this._notify.showInfo(
        "You are now editing the page",
        "Click on a field to begin editing. NOTE: You cannot change your email."
      );
      this.editing = !this.editing
    }
  }

  
  //Summary editing
  updateSummary(s) { 
    console.log("Updating summary")
    this.user.summary = s;
  }

  //Skill editing
  addSkill(aSkill: ISkills[]) {
    console.log("Adding skill " + aSkill[0].skillTitle )
    this.user.skills.push(...aSkill);
  }
  updateSkill(updatedSkill: ISkills) {
    console.log("Updating skill " + updatedSkill.skillTitle)
    this.skills.forEach(skill => {
      if (skill.skillTitle === updatedSkill.skillTitle) {
        skill = updatedSkill;
      }
    });
  }

  removeSkill(rSkill: ISkills) {
    console.log("Removing skill " + rSkill.skillTitle)
    const index: number = this.skills.findIndex(skill => {
      return skill === rSkill;
    });

    if (index != -1) {
      this.skills.splice(index, 1);
    }
  }

  //Education editing
  addEducation(e: { old: IEducationItem, new: IEducationItem }) {
    if (this.educationIsNotNull(e.new)) {
      return
    }
    else if (e.old === null) {
      console.log("Adding education " + e.new.degreeTitle)
      this.user.educationItems.push(e.new)
    }
    else {
      console.log("Updating education " + e.old.degreeTitle)
      let index = this.user.educationItems.findIndex((item) => {
        return item === e.old
      })

      this.user.educationItems[index] = e.new
    }
  }
  educationIsNotNull(e: IEducationItem): boolean {
    let isNotNull: boolean = true
    Object.getOwnPropertyNames(e).forEach(prop => {
      if (e[prop] !== null)
        isNotNull = false
    })
    return isNotNull
  }

  removeEducation(rEdu: IEducationItem) {
    console.log("removing education " + rEdu.degreeTitle)
    const index: number = this.educationItems.findIndex(eduItem => {
      return eduItem === rEdu;
    });
    alert(index);

    if (index != -1) {
      this.educationItems.splice(index, 1);
    }
  }
}