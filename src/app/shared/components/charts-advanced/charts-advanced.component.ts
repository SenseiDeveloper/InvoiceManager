import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {InvoiceModel} from "../../model/invoice.model";
import {InvoiceService} from "../../service/invoice.service";
import {takeUntil} from "rxjs/operators";
import {ProductService} from "../../service/product.service";
import {ProductModel} from "../../model/product.model";

@Component({
  selector: 'app-charts-advanced',
  templateUrl: './charts-advanced.component.html',
  styleUrls: ['./charts-advanced.component.scss']
})
export class ChartsAdvancedComponent implements OnInit , OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();

  filterProducts: any;
  products: ProductModel[];
  invoice: InvoiceModel[];
  buttonType: boolean = false;
  selectFilter: string = 'Price';
  colorScheme = {
    domain: ['#013243','#2574a9','#1e8bc3','#3498db','#22a7f0','#19b5fe']
  };

  constructor(
    private productService: ProductService,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.initProducts();
    this.initInvoice();
  }

  filterModal() {
    this.buttonType ? this.buttonType = false : this.buttonType = true;
  }

  selectedFilter(event: string){
    if(event === 'Price'){
      const newProducts = this.products.map(el => {
        return  Object.assign({},{
          name: el.name,
          value: el.price
        });
      });
      this.filterProducts = newProducts;
    }else{
       const arrayProducts = this.invoice.map( (el) => {
          return el.products ;
        });
       let newProductsList = [];
        arrayProducts.map((el) => {
          for (let key in el) {
            Object.assign(el[key],{count: 1});
            newProductsList.push(el[key]);
          }
        });

      let counter = newProductsList.reduce(function (o, i) {
        if (!o.hasOwnProperty(i.name)) {
          o[i.name] = 0;
        }
        o[i.name]++;
        return o;
      }, {});

     let resultProducts = Object.keys(counter).map(function (id) {
        return {name: id, value: counter[id]};
      });
      this.filterProducts = resultProducts;
    }
  }

  initProducts() {
    this.productService.getProducts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((products: ProductModel[]) => {
        this.products = products;
        this.selectedFilter('Price');
      });
  }

  initInvoice() {
    this.invoiceService.getInvoices()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((invoice: InvoiceModel[]) => {
        this.invoice = invoice;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
