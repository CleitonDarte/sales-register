import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from "ngx-mask";

const maskConfig: Partial<IConfig> = { validation: false };

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgxMaskModule
  ],
  providers: []
})
export class SharedModule { }