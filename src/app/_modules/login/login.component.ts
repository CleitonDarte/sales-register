import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_core/user-auth.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public invalid_: boolean = false;

  constructor(
    private authSvc: UserAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public doLogin(form: any) {
    let user = this.authSvc.users().filter(u => { return u.userName == form.username && u.userPassword == form.password })[0] || undefined;
    if (!!user?.userId) {
      let storageUser = JSON.parse(localStorage.auth ? atob(localStorage.auth) : '{}');
      storageUser.t = user.userId;
      storageUser.u = uuidv4();

      localStorage.auth = btoa(JSON.stringify(storageUser));
      setTimeout(() => { this.router.navigate(['']) }, 0);
    } else { this.invalid_ = true }
  }

}
