import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

  constructor(
    private authSvc: UserAuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let storageUser = JSON.parse(localStorage.auth ? atob(localStorage.auth) : '{}');
    this.authSvc.users().some(u => { return u.userId == storageUser.t }) && this.router.navigate(['']);
    return !this.authSvc.users().some(u => { return u.userId == storageUser.t });
  }

}
