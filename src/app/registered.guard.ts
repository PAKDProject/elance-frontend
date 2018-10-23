import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TempUserStorageService } from './temp-user-storage.service';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RegisteredGuard implements CanActivate {
  constructor(private userService: TempUserStorageService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (environment.production === false) {
      return true
    }

    if (this.userService.getUser() === undefined) {
      this.router.navigate(['user/create'])
      return false;
    }
    return true;
  }
}
