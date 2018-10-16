import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { FeatureToggling } from './feature-toggling.component';
import { Type } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FeatureTogglingService extends FeatureToggling implements CanActivate{

  constructor() { super() }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let name: string
    if (typeof(route.component) === 'function')
    {
     // the compiler is 'smart' enough to know that component here must be Type<T>
     name = route.component.name;
     name = name.replace('Component', '');
    }

    if(this.check(name)){
      return true
    }
    return false
  }

  isComponent(item: Type){
    return typeof(item) === 'function';
  }
}
