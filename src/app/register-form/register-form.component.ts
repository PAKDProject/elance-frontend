import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user-model';
import { TempUserStorageService } from '../temp-user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  constructor(private _userService: TempUserStorageService, private _router: Router) {
   }

  ngOnInit() {
  }

  saveUser({value}) {
    let user = {
      fName: value.fName,
      lName: value.lName,
      email: localStorage.getItem("email")
    }
    this._userService.setUser(user);
    localStorage.removeItem("email")
    this._router.navigate(['user-dashboard'])
  }
}
