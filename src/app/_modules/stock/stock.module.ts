import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/_core/shared.module';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';


@NgModule({
  declarations: [
    StockComponent
  ],
  imports: [
    SharedModule,
    StockRoutingModule
  ]
})
export class StockModule { }
