import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { Store } from '@ngxs/store';
import { UserState } from 'src/redux/states/user.state';

@Injectable({
  providedIn: 'root'
})
export class StateGuard implements CanActivate {
  constructor(private router: Router, private store: Store) { }
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
