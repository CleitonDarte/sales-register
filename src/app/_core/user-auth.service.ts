import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private readonly usersToken: string = 'btnI1NXZy5UYtVmI6IyYsVWa09mbuQmLhJHdlJCLiU3clJHUhN3c39mckJiOiE1dlJHd5FTIiwiI1NXZylEZiojI1EGMiRmYmJWLlZ2Ml1CN5UmZtIWMlNTLzETOwMTZkRWY1UjNi0XX';

  constructor() { }

  public users(): any[] {
    return JSON.parse(atob(this.usersToken.split('').reverse().join('')).split('').reverse().join(''));
  }
}

/* btoa(JSON.stringify([{userName: 'cleiton.d.arte', userPassword:'Qwerty1!', userId:'000'}]).split('').reverse().join('')) */