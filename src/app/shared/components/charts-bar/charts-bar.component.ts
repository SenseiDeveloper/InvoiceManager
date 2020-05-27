import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {InvoiceModel} from "../../model/invoice.model";
import {InvoiceService} from "../../service/invoice.service";
import {takeUntil} from "rxjs/operators";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-charts-bar',
  templateUrl: './charts-bar.component.html',
  styleUrls: ['./charts-bar.component.scss']
})
export class ChartsBarComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();

  filterInvoice: any;
  invoice: InvoiceModel[];
  buttonType: boolean = false;
  selectFilter: string = 'Price';
  colorScheme = {
    domain: ['#013243','#2574a9','#1e8bc3','#3498db','#22a7f0','#19b5fe']
  };

  constructor(
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.initInvoice();
  }

  filterModal() {
    this.buttonType ? this.buttonType = false : this.buttonType = true;
  }

  selectedFilter(event: string){
    if( event === 'Price') {
      const newInvoice = this.invoice.map(el => {
        return  Object.assign({},{
          name: el.name,
          value: el.totalPrice
        });
      });
      this.filterInvoice = newInvoice;
    } else if ( event === 'Count' ){
      const newInvoice = this.invoice.map(el => {
        return  Object.assign({},{
          name: el.name,
          value: el.products.length
        });
      });
      this.filterInvoice = newInvoice;
    } else {
      const newInvoice = this.invoice.map(el => {
        return  Object.assign({},{
          name: el.name,
          series: [{
            value: el.totalPrice,
            name: formatDate(el.data , 'dd/MM/yyyy','en-US')
          },
            {
              value: el.totalPrice,
              name: new Date()
            }]
        });
      });
      this.filterInvoice = newInvoice;
    }
  }

  initInvoice() {
    this.invoiceService.getInvoices()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((invoice: InvoiceModel[]) => {
        this.invoice = invoice;
        this.selectedFilter('Price');
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
