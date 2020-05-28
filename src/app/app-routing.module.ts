import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./shared/service/auth.guards";

const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  { path: 'system', loadChildren: './feature/feature.module#FeatureModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
