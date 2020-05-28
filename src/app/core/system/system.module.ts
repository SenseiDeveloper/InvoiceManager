import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import {SystemRoutingModule} from "./system-routing.module";
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {UsersComponent} from "../../shared/components/users/users.component";
import { ProductsComponent } from './products/products.component';
import {InvoiceService} from "../../shared/service/invoice.service";
import {ProductService} from "../../shared/service/product.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ProductModalComponent} from "../../shared/components/product-modal/product-modal.component";
import { InvoiceComponent } from './invoice/invoice.component';
import {ActionInvoiceComponent} from "../../shared/components/action-invoice/action-invoice.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {BacketComponent} from "../../shared/components/action-invoice/backet/backet.component";
import {ViewInvoiceComponent} from "../../shared/components/view-invoice/view-invoice.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {EditButtonComponent} from "../../shared/components/edit-button/edit-button.component";
import {DeleteButtonComponent} from "../../shared/components/delete-button/delete-button.component";
import { StatisticComponent } from './statistic/statistic.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ChartsBarComponent} from "../../shared/components/charts-bar/charts-bar.component";
import {MatRadioModule} from "@angular/material/radio";
import {ChartsAdvancedComponent} from "../../shared/components/charts-advanced/charts-advanced.component";
import {InvoiceFormsService} from "../../shared/service/invoice-forms.service";


@NgModule({
  declarations: [
    SystemComponent,
    MenuComponent,
    UsersComponent,
    ProductsComponent,
    ProductModalComponent,
    InvoiceComponent,
    ActionInvoiceComponent,
    BacketComponent,
    ViewInvoiceComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    StatisticComponent,
    ChartsBarComponent,
    ChartsAdvancedComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    Ng2SearchPipeModule,
    MatProgressSpinnerModule,
    NgxChartsModule,
    MatRadioModule
  ],
  providers: [ ProductService, InvoiceService, InvoiceFormsService],
  entryComponents: [ProductModalComponent]
})
export class SystemModule { }
