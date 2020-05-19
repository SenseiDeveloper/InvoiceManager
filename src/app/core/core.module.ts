import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthModule} from "./auth/auth.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {ApiBaseService} from "../shared/API/api-base.service";
import {AuthGuard} from "../shared/service/auth.guards";
import {TokenInterceptorService} from "../shared/service/token-interceptor.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ApiBaseService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule { }
