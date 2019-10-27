import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CheckCancelFormGuard implements CanDeactivate<any> {

  constructor(private router: Router, private location: Location){}

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      // Logic
    if (!component.mIsSubmitted) {
      // mIsSubmitted is status submit of StockCreateComponent, StockEditComponent
      // Fix wrong route history error
      const currentUrlTree = this.router.createUrlTree([], currentRoute);
      const currentUrl = currentUrlTree.toString();
      this.location.go(currentUrl);
      return window.confirm('Are you sure?');
    }
    return true;
  }


}
