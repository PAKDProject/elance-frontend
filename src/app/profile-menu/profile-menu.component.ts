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
  profileCards;

  constructor(private _notify: NotificationService, private store: Store) { }

  ngOnInit() {
    this.user$.subscribe(element => {
      this.skills = element.skills;
      this.educationItems = element.educationItems;
      this.socialLinks = element.socialLinks;
      this.profileCards = element.profileCards;

      this.user = {
        fName: element.fName,
        lName: element.lName,
        tagline: element.tagline,
        summary: element.summary,
        educationItems: element.educationItems,
        skills: element.skills
      };

      //Assign content to preset cards
      this.profileCards.forEach(c => {
        switch(c.type)
        {
          case "bio":
            c.content = element.summary
            break;
          case "edu":
            c.content = this.educationItems
            break;
          case "skills":
            c.content = this.skills
            break;
        }
      });
    });
  }

  //Draggable components
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.profileCards, event.previousIndex, event.currentIndex);
  }

  //Row actions
  rowAction(e) {
    switch(e.type)
    {
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
    console.log("Adding skill " + aSkill[0].skillTitle )
    this.user.skills.push(...aSkill);
  }
  changeSkill(updatedSkill: ISkills) {
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
    if(e != null)
    {
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
      else if (e.old != null && e.new == null)
      {
        console.log("Removing education " + e.old.degreeTitle)
        this.removeEducation(e.old); 
      }
    }
  }

  removeEducation(rEdu: IEducationItem) {
    console.log("removing education " + rEdu.degreeTitle)
    const index: number = this.educationItems.findIndex(eduItem => {
      return eduItem === rEdu;
    });
    
    if (index != -1) {
      this.educationItems.splice(index, 1);
    }
  }

  //Custom cards editing
  changeCustomCardTitle(e: {newTitle: string, indexInArray: number}) {
    console.log("Updating title of card at index " + e.indexInArray + " to " + e.newTitle);
    this.profileCards[e.indexInArray].title = e.newTitle
  }

  changeCustomCardSummary(e: {newSummary: string, indexInArray: number}) {
    console.log("Updating text of card at index " + e.indexInArray + " to " + e.newSummary);
    this.profileCards[e.indexInArray].content = e.newSummary
  }

  removeCustomCard(index) {
    console.log("removing custom card at index " + index)
    this.profileCards.splice(index, 1);
  }

  addCustomCard() {
    if(this.profileCards.length < 8)
    {
      this.profileCards.push(
        {
          title: "Click to edit title",
          type: "custom",
          content: "Add your content here. This card supports markdown."
        }
      )
      console.table(this.profileCards);
    }
    else
    {
      this._notify.showError("Card limit reached","You have reached the maximum amount of cards. Please remove or edit an existing card.")
    }
  }
}