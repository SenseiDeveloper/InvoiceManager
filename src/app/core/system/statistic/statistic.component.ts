import {Component, OnDestroy, OnInit} from '@angular/core';
import {InvoiceService} from "../../../shared/service/invoice.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {InvoiceModel} from "../../../shared/model/invoice.model";
import {ProductService} from "../../../shared/service/product.service";
import {ProductModel} from "../../../shared/model/product.model";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit,OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  colorScheme = {
    domain: ['#013243','#2574a9','#1e8bc3','#3498db','#22a7f0','#19b5fe']
  };
  products: any[];

  constructor(
    private invoiceService: InvoiceService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.initProducts();
  }


  initProducts() {
    this.productService.getProducts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((product: ProductModel[])=>{
        const newProducts = product.map(el => {
          return  Object.assign({},{
            name: el.name,
            value: el.price
          });
        });
        this.products = newProducts;
      })
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
