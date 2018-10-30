import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TempUserStorageService } from '../services/temp-user/temp-user-storage.service';
import { environment } from '../environments/environment'
import { Store } from '@ngxs/store';
import { UserState, UserStateModel } from 'src/redux/states/user.state';

@Injectable({
  providedIn: 'root'
})
export class StateGuard implements CanActivate {
  constructor(private userService: TempUserStorageService, private router: Router, private store: Store) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      this.store.selectOnce(UserState.getUser).subscribe(user => {
        if (Object.keys(user).length === 0) {
          this.router.navigate(['callback/auth'])
          observer.next(false);
        }
        else {
          observer.next(true)
        }
      })
    })
  }
}
