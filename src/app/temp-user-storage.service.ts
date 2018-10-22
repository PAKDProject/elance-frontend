import { Injectable } from '@angular/core';
import { IUser } from './models/user-model';

@Injectable({
  providedIn: 'root'
})
export class TempUserStorageService {

  constructor() { }
  private user: IUser
  getUser() {
    return this.user;
  }

  setUser(value) {
    this.user = value;
  }
}