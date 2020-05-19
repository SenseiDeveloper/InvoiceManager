import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SystemComponent} from "./system.component";


const routes: Routes = [
  {path: '', component: SystemComponent, children: [
      /*{path: 'products', component: ProductComponent},
      {path: 'invoice', component: InvoiceComponent},
      {path: 'create-invoice', component: CreateInvoiceComponent},
      {path: 'invoice/view/:id', component: ViewInvoiceComponent},
      {path: 'invoice/edit/:id', component: CreateInvoiceComponent},
      {path: 'statistics', component: StatisticComponent}*/
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
