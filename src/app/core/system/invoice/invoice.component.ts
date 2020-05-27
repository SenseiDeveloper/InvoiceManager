import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {InvoiceModel} from "../../../shared/model/invoice.model";
import {InvoiceService} from "../../../shared/service/invoice.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  invoices = new MatTableDataSource<InvoiceModel>();
  defaultInvoices: InvoiceModel[];
  select: string = 'default';
  displayedColumns: string[] = [ 'position', 'name', 'data', 'total', 'action'];
  isLoad: boolean = false;

  constructor(
    private invoiceService: InvoiceService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initInvoices();
    this.updateDataInvoice();
  }

  updateDataInvoice() {
    this.invoiceService.getUpdateData()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((invoice: InvoiceModel[]) => {
        this.invoices.data = invoice;
        this.defaultInvoices = invoice;
      });
  }

  initInvoices() {
    this.invoiceService.getInvoices()
      .pipe( takeUntil(this.unsubscribe) )
      .subscribe( (invoices: InvoiceModel[]) => {
        this.invoices.data = invoices;
        this.defaultInvoices = invoices;
        setTimeout(() => this.isLoad = true, 500);
      });
  }

  filterName() {
    let filter = [...this.defaultInvoices];
    filter.sort((one, two) => {
      if (one.name < two.name) return -1;
      if (one.name > two.name) return 1;
      return 0;
    });
    return filter;
  }

  filterPrice() {
    let filter = [...this.defaultInvoices];
    filter.sort((one, two) => {
      if (one.totalPrice < two.totalPrice) return -1;
      if (one.totalPrice > two.totalPrice) return 1;
      return 0;
    });
    return filter;
  }

  selectFilter(event) {
    if (event.value === 'default') {
      this.invoices.data = this.defaultInvoices;
    } else if (event.value === 'nameup') {
      this.invoices.data = this.filterName();
    } else if (event.value === 'namedown') {
      this.invoices.data = this.filterName().reverse();
    } else if (event.value === 'priceup') {
      this.invoices.data = this.filterPrice().reverse();
    } else if (event.value === 'pricedown') {
      this.invoices.data = this.filterPrice();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.invoices.filter = filterValue.trim().toLowerCase();
  }

  viewInvoice( id: number ) {
    this.router.navigate([`system/invoice/view/${id}`]);
  }


  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
