import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  // private readonly usersToken: string = 'btnI1NXZy5UYtVmI6IyYsVWa09mbuQmLhJHdlJCLiU3clJHUhN3c39mckJiOiE1dlJHd5FTIiwiI1NXZylEZiojI1EGMiRmYmJWLlZ2Ml1CN5UmZtIWMlNTLzETOwMTZkRWY1UjNi0XX';
  private readonly usersToken: string = '==wW7JSdzVmcOFWblJiOiMGbllGdv5mLk5SYyRXZiwiI1NXZyBVYzN3dvJHZiojIRdXZyRXexEiIsISdzVmcJRmI6ISNhBjYkJmZi1SZmNTZtQTOlZWLiFTZz0yMxkDMzUGZkFWN1YjI9xyeiU3clJnTh1WZiojIoFmbkxWeuM3bhJXZzJCLiU3clJHUhN3c39mckJiOigEQuRGT5BTOiwiI1NXZylEZiojIzEmZ2cDM4ATLjVWZ20CN5UTOtkjY3IWL0kjNiFTZ3czYwEGZi0XX';

  constructor() { }

  public users(): any[] {
    return JSON.parse(atob(this.usersToken.split('').reverse().join('')).split('').reverse().join(''));
  }
}

/* btoa(JSON.stringify([{userName: 'cleiton.d.arte', userPassword:'Qwerty1!', userId:'000'}]).split('').reverse().join('')) */