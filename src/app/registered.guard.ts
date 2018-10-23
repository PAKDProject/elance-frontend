import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TempUserStorageService } from './temp-user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisteredGuard implements CanActivate {
  constructor(private userService: TempUserStorageService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.userService.getUser() === undefined){
        this.router.navigate(['user/create'])
        return false;
      }
    return true;
  }
}
