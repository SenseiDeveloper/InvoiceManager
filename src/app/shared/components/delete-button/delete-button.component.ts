import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {InvoiceModel} from "../../model/invoice.model";
import {InvoiceService} from "../../service/invoice.service";
import {Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  @Input() invoice: InvoiceModel[];

  constructor(
    private invoiceService: InvoiceService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  deleteInvoice() {
   this.invoiceService.removeInvoice( this.invoice)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((invoices: InvoiceModel[]) => {
          this.succsessDelete(invoices);
        },
        () => this.toastrService.error('Помилка видалення інвойсу')
      );
  }

  succsessDelete(invoices: InvoiceModel[]) {
    if(this.router.url !== '/system/invoice'){
      this.router.navigate(['system/invoice']);
    }
    this.invoiceService.sendUpdateInvoice(invoices);
    this.toastrService.success('Інвойс видалено');
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
