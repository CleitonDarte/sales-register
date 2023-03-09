import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/_core/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public global: GlobalService
  ) { }

  ngOnInit(): void {
  }

}
