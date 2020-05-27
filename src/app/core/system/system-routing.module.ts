import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SystemComponent} from "./system.component";
import {ProductsComponent} from "./products/products.component";
import {InvoiceComponent} from "./invoice/invoice.component";
import {ActionInvoiceComponent} from "../../shared/components/action-invoice/action-invoice.component";
import {ViewInvoiceComponent} from "../../shared/components/view-invoice/view-invoice.component";
import {StatisticComponent} from "./statistic/statistic.component";


const routes: Routes = [
  {path: '', component: SystemComponent, children: [
      {path: 'products', component: ProductsComponent},
      {path: 'invoice', component: InvoiceComponent},
      {path: 'action-invoice', component: ActionInvoiceComponent},
      {path: 'invoice/view/:id', component: ViewInvoiceComponent},
      {path: 'invoice/edit/:id', component: ActionInvoiceComponent},
      {path: 'statistics', component: StatisticComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
