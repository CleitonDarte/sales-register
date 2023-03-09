import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public readonly logo: string = 'https://raw.githubusercontent.com/CleitonDarte/sales-register/master/src/assets/images/logo.bar.jumbo.svg';

  constructor() { }

}
