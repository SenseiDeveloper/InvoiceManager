import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InvoiceService} from "../../service/invoice.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {InvoiceModel} from "../../model/invoice.model";

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  activeInvoice: InvoiceModel[];

  constructor(
    private invoiceService: InvoiceService,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeInvoiceId();
  }

  activeInvoiceId() {
    const invoiceId = this.activeRouter.snapshot.params.id;
    this.getViewInvoice(invoiceId);
  }
  getViewInvoice(id: string) {
    this.invoiceService.getSelectInvoice(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((invocie: InvoiceModel[]) => this.activeInvoice = invocie );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
