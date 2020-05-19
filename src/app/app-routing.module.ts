import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./shared/service/auth.guards";

const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  { path: 'system', loadChildren: './core/system/system.module#SystemModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
