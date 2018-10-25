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

  image: any;
  fileToUpload: File;
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  firstName: string
  lastName: string 

  constructor(private _formBuilder: FormBuilder, private _userStore: TempUserStorageService, private _router: Router) { }

  ngOnInit() {
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

  addUser(fName: string, lName: string){
    let user: IUser = {
      userID: 0,
      email: localStorage.getItem("email"),
      fName,
      lName
    }

    this._userStore.setUser(user)
    this._router.navigate(['/user-dashboard'])
  }
}
