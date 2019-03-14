import { Component, OnInit } from "@angular/core";
import { IUser, IEducationItem, ISocialLink } from "src/models/user-model";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { UserState } from "src/redux/states/user.state";
import { ISkills } from "src/models/skill-model";
import { NotificationService } from "src/services/notifications/notification.service";
import { RequestUpdateUser } from "src/redux/actions/user.actions";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { IProfileCard } from "src/models/profile-card";
import { IJob } from "src/models/job-model";
import { MatDialog } from "@angular/material";
import { UploadImageModalComponent } from "../modals/upload-image-modal/upload-image-modal.component";

@Component({
  selector: "app-profile-menu",
  templateUrl: "./profile-menu.component.html",
  styleUrls: ["./profile-menu.component.scss"]
})
export class ProfileMenuComponent implements OnInit {
  fallbackAvatar: string = "../../assets/images/default_user.png"
  @Select(UserState.getUser)
  user$: Observable<IUser>;

  user: Partial<IUser> = {};

  constructor(private _notify: NotificationService, private store: Store, private dialog: MatDialog) { }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.user$.subscribe(u => {
      this.user = u

      //Assign content to preset cards
      u.profileCards.forEach(c => {
        switch (c.type) {
          case "bio":
            c.content = u.summary
            break;
          case "edu":
            c.content = u.educationItems
            break;
          case "skills":
            c.content = u.skills
            break;
          case "jobs":
            c.content = u.jobHistory
            break;
        }
      });
    }).unsubscribe()    
  }

  //Draggable components
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.user.profileCards, event.previousIndex, event.currentIndex);
  }

  //Row actions
  rowAction(e) {
    switch (e.type) {
      case 'bioChange':
        this.updateSummary(e.content);
        break;
      case 'addSkill':
        this.addSkill(e.content)
        break;
      case 'removeSkill':
        this.removeSkill(e.content);
        break;
      case 'changeSkill':
        this.changeSkill(e.content);
        break;
      case 'addEducation':
        this.addEducation(e.content);
        break;
      case 'removeEducation':
        this.addEducation(e.content);
        break;
      case 'changeEducation':
        this.addEducation(e.content);
        break;
      case 'cTitleChange':
        this.changeCustomCardTitle(e.content);
        break;
      case 'cSummaryChange':
        this.changeCustomCardSummary(e.content);
        break;
    }
  }
  //Editing (general)
  editing: boolean = false;
  toggleEditing() {
    if (this.editing) {
      this.store.dispatch(new RequestUpdateUser(this.user)).subscribe(res => {
        this.editing = !this.editing
        this.getUser()
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
    console.log("Updating bio")
    console.log(s)
    this.user.summary = s;
  }

  //Skill editing
  addSkill(aSkill: ISkills[]) {
    console.log("Adding skill " + aSkill[0].skillTitle)
    this.user.skills.push(...aSkill);
  }
  changeSkill(updatedSkill: ISkills) {
    console.log("Updating skill " + updatedSkill.skillTitle)
    this.user.skills.forEach(skill => {
      if (skill.skillTitle === updatedSkill.skillTitle) {
        skill = updatedSkill;
      }
    });
  }

  removeSkill(rSkill: ISkills) {
    console.log("Removing skill " + rSkill.skillTitle)
    const index: number = this.user.skills.findIndex(skill => {
      return skill === rSkill;
    });

    if (index != -1) {
      this.user.skills.splice(index, 1);
    }
  }

  //Education editing
  addEducation(e: { old: IEducationItem, new: IEducationItem }) {
    console.log(e)
    if (e != null) {
      //If old is null but new isnt, add education
      if (e.old === null && e.new != null) {
        console.log("Adding education " + e.new.degreeTitle)
        this.user.educationItems.push(e.new)
      }
      //If old and new aren't null, update
      else if (e.old != null && e.new != null) {
        console.log("Updating education " + e.old.degreeTitle)
        let index = this.user.educationItems.findIndex((item) => {
          return item === e.old
        })

        this.user.educationItems[index] = e.new
      }
      //If old isn't null and new is, delete
      else if (e.old != null && e.new == null) {
        console.log("Removing education " + e.old.degreeTitle)
        this.removeEducation(e.old);
      }
    }
  }

  removeEducation(rEdu: IEducationItem) {
    console.log("removing education " + rEdu.degreeTitle)
    const index: number = this.user.educationItems.findIndex(eduItem => {
      return eduItem === rEdu;
    });

    if (index != -1) {
      this.user.educationItems.splice(index, 1);
    }
  }

  //Custom cards editing
  changeCustomCardTitle(e: { newTitle: string, indexInArray: number }) {
    console.log("Updating title of card at index " + e.indexInArray + " to " + e.newTitle);
    this.user.profileCards[e.indexInArray].title = e.newTitle
  }

  changeCustomCardSummary(e: { newSummary: string, indexInArray: number }) {
    console.log("Updating text of card at index " + e.indexInArray + " to " + e.newSummary);
    this.user.profileCards[e.indexInArray].content = e.newSummary
  }

  removeCustomCard(index) {
    console.log("removing custom card at index " + index)
    this.user.profileCards.splice(index, 1);
  }

  addCustomCard() {
    if (this.user.profileCards.length < 8) {
      this.user.profileCards.push(
        {
          title: "Click to edit title",
          type: "custom",
          content: "Add your content here. This card supports markdown."
        }
      )
      console.table(this.user.profileCards);
    }
    else {
      this._notify.showError("Card limit reached", "You have reached the maximum amount of cards. Please remove or edit an existing card.")
    }
  }

  editPic() {
    const dialogRef = this.dialog.open(UploadImageModalComponent, {
      data: "logo"
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        console.log(data)
        this.user.avatarUrl = data;
      }
    })
  }

  //Editing social links
  saveSocialLink($event) {
    this.user.socialLinks.push($event)
  }

  removeSocialLink(s: ISocialLink) {
    const index: number = this.user.socialLinks.findIndex(sLink => {
      return sLink === s;
    });

    if (index != -1) {
      this.user.socialLinks.splice(index, 1);
    }
  }
}