import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/_core/shared.module';

import { SaleRoutingModule } from './sale-routing.module';
import { SaleComponent } from './sale.component';


@NgModule({
  declarations: [
    SaleComponent
  ],
  imports: [
    SharedModule,
    SaleRoutingModule
  ]
})
export class SaleModule { }
