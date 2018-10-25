import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user-model';
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
  skills: string[] = []
  user: IUser = { email: "sample@gmail.com", userID: 1 };


  personalDetailsForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.personalDetailsForm = this.fb.group({
      fName: [this.user.fName, Validators.required],
      lName: [this.user.lName, Validators.required],
      dob: [this.user.dob, [Validators.min(1900), Validators.max(2018)]],
      phone: [this.user.phone, [Validators.pattern("\\d{6,8}")]]
    });

    this.personalDetailsForm.valueChanges.subscribe(data => {
      this.user.fName = data.fName;
      this.user.lName = data.lName;
      this.user.dob = data.dob;
      this.user.phone = data.phone;
      console.log(this.user);
    });
  }



  addItem(title: string) {
    this.skills.push(title);
  }
  removeItem(skill: string) {
    let index = this.skills.indexOf(skill);
    if (index === -1) {
      console.log("error");

    }
    else {
      this.skills.splice(index, 1);
    }
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
