import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ResultsGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log('guard', route.queryParams && route.queryParams.q);
    if (
      route.queryParams &&
      route.queryParams.q != null &&
      route.queryParams.q != undefined &&
      route.queryParams.q != ""
    ) {
      return true;
    } else {
      this.router.navigate(['/play']);
      return false;
    }
  }
}
