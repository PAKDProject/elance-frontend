import { Component, OnInit } from '@angular/core';
import { IUser, ISkill, IEducationItem, ISocialLink } from '../models/user-model';
import { TempUserStorageService } from '../temp-user-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as AWS from 'aws-sdk';
import { Store } from '@ngxs/store';
import { RequestUserSuccessAction } from 'src/redux/actions/user.actions';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  isLinear = true;
  skillsAdded: ISkill[] = [];
  educationAdded: IEducationItem[] = [];
  socialsAdded: ISocialLink[] = [];
  user: IUser = { email: "sample@gmail.com", userID: 1, skills: this.skillsAdded, educationItems: this.educationAdded, socialLinks: this.socialsAdded };


  personalDetailsForm: FormGroup;
  aboutYouForm: FormGroup;
  skillForm: FormGroup;
  educationForm: FormGroup;
  socialForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: TempUserStorageService,
    private router: Router,
    private store: Store) { }

  ngOnInit() {


    this.personalDetailsForm = this.fb.group({
      fName: [this.user.fName, Validators.required],
      lName: [this.user.lName, Validators.required],
      dob: [this.user.dob, [Validators.min(1900), Validators.max(2018)]],
      phone: [this.user.phone, [Validators.pattern("\\d{6,10}")]]
    });

    this.aboutYouForm = this.fb.group({
      tagline: '',
      description: ['', [Validators.maxLength(300)]]
    });

    this.skillForm = this.fb.group({
      skillTitle: '',
      skillDescription: ''
    });

    this.educationForm = this.fb.group({
      degreeTitle: '',
      educationStartDate: '',
      educationEndDate: '',
      collegeName: '',
      finalGrade: '',
      educationDescription: ''
    });

    this.socialForm = this.fb.group({
      facebook: '',
      twitter: '',
      github: '',
      linkedin: ''
    });



    this.personalDetailsForm.valueChanges.subscribe(data => {
      this.user.fName = data.fName;
      this.user.lName = data.lName;
      this.user.dob = data.dob;
      this.user.phone = data.phone;
      console.log(this.user);
    });

    this.aboutYouForm.valueChanges.subscribe(data => {
      this.user.tagline = data.tagline;
      this.user.summary = data.description;
      console.log(this.user);
    });

    this.educationForm.valueChanges.subscribe(console.log)


  }

  addSkill() {
    let alreadyContained = false;
    this.skillsAdded.forEach(skill => {
      if (skill.title.toLowerCase() === this.skillForm.get('skillTitle').value.toLowerCase()) {
        alreadyContained = true
      }
    });
    if (!alreadyContained) {
      this.skillsAdded.push({
        title: this.skillForm.get('skillTitle').value,
        description: this.skillForm.get('skillDescription').value
      });
    }
    this.skillForm.reset();
  }

  addEducation() {
    let valid: boolean = true;
    if (this.educationForm.get('educationStartDate').value >= this.educationForm.get('educationEndDate').value) {
      valid = false;
    }

    if (valid) {
      this.educationAdded.push({
        degreeTitle: this.educationForm.get('degreeTitle').value,
        startYear: this.educationForm.get('educationStartDate').value,
        endYear: this.educationForm.get('educationEndDate').value,
        grade: this.educationForm.get('finalGrade').value,
        description: this.educationForm.get('educationDescription').value,
        collegeName: this.educationForm.get('collegeName').value
      });

      this.educationForm.reset();

      console.log(this.user)
    }
  }


  removeItem(skill: ISkill) {
    let i = this.skillsAdded.indexOf(skill);
    this.skillsAdded.splice(i, 1);
  }


  addUser(fName: string, lName: string) {
    let user: IUser = {
      userID: 0,
      email: localStorage.getItem("email"),
      fName,
      lName
    }


  }

  createUser() {
    this.checkSocials();

    if (this.user.fName && this.user.lName) {
      //this.userService.setUser(this.user);
      this.user.summary = this.stupidify(this.user.summary)
      this.store.dispatch(new RequestUserSuccessAction(this.user))

      this.router.navigateByUrl('home/user-profile');
    }
  }

  checkSocials() {
    const facebook = this.socialForm.get('facebook').value;
    const twitter = this.socialForm.get('twitter').value;
    const github = this.socialForm.get('github').value;
    const linkedin = this.socialForm.get('linkedin').value;

    if (facebook) this.socialsAdded.push({ socialPlatformName: 'facebook', linkUrl: facebook });
    if (twitter) this.socialsAdded.push({ socialPlatformName: 'twitter', linkUrl: twitter });
    if (github) this.socialsAdded.push({ socialPlatformName: 'github', linkUrl: github });
    if (linkedin) this.socialsAdded.push({ socialPlatformName: 'linkedin', linkUrl: linkedin });
  }

  createTestUser() {
    this.userService.getTestUser().subscribe(user => {
      this.store.dispatch(new RequestUserSuccessAction(user))
      this.router.navigateByUrl('home/user-profile');
    });
  }

  stupidify(string: string): string {
    if (string !== undefined) {
      let descArr = string.split('')
      let big = false
      for (var j = 0; j < descArr.length; j++) {
        if (descArr[j] == ' ') {
          continue
        }
        else {
          if (big) {
            descArr[j] = descArr[j].toUpperCase()
            big = false
          }
          else {
            descArr[j] = descArr[j].toLowerCase()
            big = true
            continue
          }
        }
      }
      return descArr.join('')
    }
    return
  }
}
