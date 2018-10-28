import { Component, OnInit } from '@angular/core';
import { IUser, ISkill } from '../models/user-model';
import { TempUserStorageService } from '../temp-user-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as AWS from 'aws-sdk';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  isLinear = true;
  skillsAdded: ISkill[] = []
  user: IUser = { email: "sample@gmail.com", userID: 1, skills: this.skillsAdded };


  personalDetailsForm: FormGroup;
  aboutYouForm: FormGroup;
  skillForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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



  addUser(fName: string, lName: string) {
    let user: IUser = {
      userID: 0,
      email: localStorage.getItem("email"),
      fName,
      lName
    }


  }
}
