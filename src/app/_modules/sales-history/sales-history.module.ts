import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesHistoryRoutingModule } from './sales-history-routing.module';
import { SalesHistoryComponent } from './sales-history.component';


@NgModule({
  declarations: [
    SalesHistoryComponent
  ],
  imports: [
    CommonModule,
    SalesHistoryRoutingModule
  ]
})
export class SalesHistoryModule { }
