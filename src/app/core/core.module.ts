import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthModule} from "./auth/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ]
})
export class CoreModule { }
