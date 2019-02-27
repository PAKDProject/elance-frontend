import { Component, OnInit } from "@angular/core";
import {
  IUser,
  IEducationItem,
  ISocialLink
} from "src/models/user-model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store, Select } from "@ngxs/store";
import { RequestUserSuccessAction } from "src/redux/actions/user.actions";
import { UserService } from "../../services/user-service/user.service";
import { UserState } from "src/redux/states/user.state";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material";
import { UploadImageModalComponent } from "src/app/modals/upload-image-modal/upload-image-modal.component";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"]
})
export class RegisterFormComponent implements OnInit {

  //testing shieeet
  socialLinks: any[] = []

  modifySelection: boolean = false;
  isProduction: boolean = environment.production

  //User related fields
  educationAdded: IEducationItem[] = [];
  socialsAdded: ISocialLink[] = [];
  //user object
  user: IUser = {
    email: "",
    id: "",
    skills: [],
    educationItems: this.educationAdded,
    socialLinks: this.socialLinks
  };
  @Select(UserState.getUser)
  user$: Observable<IUser>;

  aboutYouForm: FormGroup;
  educationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    //Set up all the forms

    this.user$.subscribe(user => {
      this.user.email = user.email;
      this.user.fName = user.fName;
      this.user.lName = user.lName;
      this.user.id = user.id;
      this.user.organisations = user.organisations;
    });
    //About you form
    this.aboutYouForm = this.fb.group({
      //TODO - add profile image
      tagline: this.user.tagline,
      description: [this.user.summary, [Validators.maxLength(300)]]
    });
    //Education form
    this.educationForm = this.fb.group({
      degreeTitle: ["", Validators.required],
      educationStartDate: [
        "",
        [Validators.min(1900), Validators.max(new Date().getFullYear())]
      ],
      educationEndDate: [""],
      collegeName: [""],
      finalGrade: [""],
      educationDescription: [""]
    });

    //Store values into relevant fields
    this.aboutYouForm.valueChanges.subscribe(data => {
      this.user.tagline = data.tagline;
      this.user.summary = data.description;
    });
  }

  //#region Getters

  get description() {
    return this.aboutYouForm.get("description");
  }

  get degreeTitle() {
    return this.educationForm.get("degreeTitle");
  }
  get collegeName() {
    return this.educationForm.get("collegeName");
  }
  get finalGrade() {
    return this.educationForm.get("finalGrade");
  }
  get educationDescription() {
    return this.educationForm.get("educationDescription");
  }
  get educationStartDate() {
    return this.educationForm.get("educationStartDate");
  }
  get educationEndDate() {
    return this.educationForm.get("educationEndDate");
  }
  //#endregion

  //Retrieve education from form, check if start date is before end date and then add to array
  addEducation() {
    let valid: boolean = true;

    if (this.modifySelection) this.modifySelection = false;

    if (this.educationStartDate.value && this.educationEndDate.value) {
      if (this.educationStartDate.value >= this.educationEndDate.value) {
        valid = false;
        this.educationEndDate.setErrors({
          incorrect: true
        });
      }
    }

    if (this.degreeTitle.value === "") {
      valid = false;
      this.degreeTitle.setErrors({
        incorrect: true
      });
    }

    if (valid) {
      this.educationAdded.push({
        degreeTitle: this.degreeTitle.value,
        startYear: this.educationStartDate.value,
        endYear: this.educationEndDate.value,
        grade: this.finalGrade.value,
        description: this.educationDescription.value,
        collegeName: this.collegeName.value
      });

      this.educationForm.reset();
    }
  }
  deleteItem(type: string) {
    this.modifySelection = false;
    switch (type) {
      case "education":
        this.educationForm.reset();
        break;
      default:
        break;
    }
  }

  //On submit of entire page
  createUser() {
    //Retrieve any social media links that were entered
    //this.checkSocials();
    if (this.user.fName == "Bee" && this.user.lName == "Movie") {
      this.router.navigate(["secret"]);
    } else {
      if (this.user.fName && this.user.lName) {
        // this.userServiceTemp.setUser(this.user);
        // this.user.summary = RegisterFormComponent.stupidify(this.user.summary); NEVER TOUCH THIS EVER AGAIN
        this.setDefaultProfileCards();
        this.userService.createUser(this.user);
        this.store.dispatch(new RequestUserSuccessAction(this.user));
        this.router.navigate(["home/user-profile"]);
      }
    }
  }

  //Set default profile cards
  setDefaultProfileCards() {
    this.user.profileCards =
      [
        {
          title: "About Me",
          type: "bio"
        },
        {
          title: "Education",
          type: "edu"
        },
        {
          title: "Skills",
          type: "skills"
        }
      ]
  }



  editItem(item: IEducationItem) {
    this.modifySelection = true;
    const index = this.educationAdded.indexOf(item);
    if (index !== -1) this.educationAdded.splice(index, 1);

    this.educationForm.setValue({
      degreeTitle: item.degreeTitle,
      collegeName: item.collegeName,
      educationStartDate: item.startYear,
      educationEndDate: item.endYear,
      finalGrade: item.grade,
      educationDescription: item.description
    });
  }

  createTestUser1() {
    this.userService.getTestUser1().subscribe(user => {
      this.store.dispatch(new RequestUserSuccessAction(user));
      this.router.navigateByUrl("home/user-dashboard");
    });
  }

  createTestUser2() {
    this.userService.getTestUser2().subscribe(user => {
      this.store.dispatch(new RequestUserSuccessAction(user));
      this.router.navigateByUrl("home/user-dashboard");
    });
  }

  openUploadModal(): void {
    this.dialog.open(UploadImageModalComponent, {
      maxWidth: "1000px",
      panelClass: "modalStyle",
      data: {
        oldUrl: this.user.avatarUrl,
        type: "profile"
      }
    }).afterClosed().subscribe(res => {
      if (res !== undefined) {
        this.user.avatarUrl = res.url
      }
    });
  }

  public static stupidify(string: string): string {
    if (string !== undefined) {
      let descArr = string.split("");
      let big = false;
      for (var j = 0; j < descArr.length; j++) {
        if (descArr[j] == " ") {
          continue;
        } else {
          if (big) {
            descArr[j] = descArr[j].toUpperCase();
            big = false;
          } else {
            descArr[j] = descArr[j].toLowerCase();
            big = true;
            continue;
          }
        }
      }
      return descArr.join("");
    }
    return;
  }

  saveSocialLink($event) {
    this.socialLinks.push($event)
  }
  removeSocialLink(s: ISocialLink) {
    const index: number = this.socialLinks.findIndex(sLink => {
      return sLink === s;
    });

    if (index != -1) {
      this.socialLinks.splice(index, 1);
    }
  }
}
