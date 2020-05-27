import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ProductModel} from "../../model/product.model";
import {ProductService} from "../../service/product.service";
import {takeUntil} from "rxjs/operators";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {PriceModel} from "../../model/price.model";
import {ToastrService} from "ngx-toastr";
import {InvoiceService} from "../../service/invoice.service";
import {InvoiceModel} from "../../model/invoice.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-invoice',
  templateUrl: './action-invoice.component.html',
  styleUrls: ['./action-invoice.component.scss']
})
export class ActionInvoiceComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  products: ProductModel[];
  selectProducts: ProductModel[] = [];
  price: PriceModel[];
  invForm: FormGroup;
  invoiceTitle: string = 'Створити інвойс';

  constructor(
    private productService: ProductService,
    private toastrService: ToastrService,
    private invoiceService: InvoiceService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initProducts();
    this.initPrice();
    this.initForm();
  }

  invObject() {
    return Object.assign({
      name: this.invForm.value.name,
      data: this.invForm.value.picker,
      totalPrice: this.price['totalPrice'],
      products: this.selectProducts
    });
  }

  submit() {
    if ( this.router.url !== '/system/action-invoice' ) {
      const editObject = Object.assign(this.invObject(),{
        id: +this.activeRoute.snapshot.params.id
      });

      this.invoiceService.editInvoice(editObject)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((invoice: InvoiceModel[]) =>
            this.successInvoice('Інвойс обновлено'),
          () => this.toastrService.error('Помилка обновлення інвойсу'));
    } else {
      if (this.invForm.valid) {
        console.log(this.invForm.valid);
        console.log(this.invForm)
        if ( this.selectProducts.length !== 0) {
          this.invoiceService.addInvoice(this.invObject())
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() =>
                this.successInvoice('Новий інвойс створено'),
              () => this.toastrService.error('Помилка створення інвойсу')
            );
        } else {
          this.toastrService.error('Добавте продукт до контейнеру');
        }
      } else {
        this.toastrService.error("Поля ім'я і дата обов'язкові");
      }
    }
  }

  successInvoice(msg: string) {
    this.router.navigate(['system/invoice']);
    this.toastrService.success(msg);
  }

  initForm() {
    this.invForm = new FormGroup({
      name: new FormControl('', Validators.required),
      picker: new  FormControl('', Validators.required)
    });
  }


  initProducts() {
      if ( this.router.url !== '/system/action-invoice' ) {
        this.invoiceService.getSelectInvAndProducts(this.activeRoute.snapshot.params.id)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((invoice: InvoiceModel[]) => {
            this.succsessInitInvoiceandProducts(invoice);
          });
    } else {
        this.productService.getProducts()
          .pipe( takeUntil(this.unsubscribe) )
          .subscribe( (products: ProductModel[]) => {
            this.products = products;
          });
      }
  }

  succsessInitInvoiceandProducts(invoice: InvoiceModel[]) {
    this.invoiceTitle = 'Редагувати інвойс'
    this.products = invoice['nonSelect'];
    this.selectProducts = invoice['products'];
    this.patchValueHeader(invoice);
    this.changePrice();
  }

  patchValueHeader(invoice: InvoiceModel[]) {
    this.invForm.patchValue({
      name: invoice['name'],
      picker: invoice['data']
    });
  }

  initPrice() {
    this.price = [];
    Object.assign(this.price, {
      total: 0,
      discount: 0,
      totalPrice: 0
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    event.container.data.forEach(el => {
      if ( el.hasOwnProperty('discount') === false ) {
         Object.assign(el,{discount: 0})
      }
    });
    this.changePrice();
  }

  changePrice() {
    const formArray  = this.selectProducts.map( form => {
      return form.price;
    });
    const formDiscountArray = this.selectProducts.map( form => {
      if ( form.discount !== 0 ) {
        return  ( form.price * form.discount ) / 100;
      } else {
        return Number(0);
      }
    });

    const formTotal = formArray.reduce((el1, el2) => el1 + el2 ) ;
    const formDiscount = formDiscountArray.reduce((el1, el2) => el1 + el2 ) ;
    const formPrice = formTotal - formDiscount;
    Object.assign(this.price, {
      total: formTotal.toFixed(1),
      discount: formDiscount.toFixed(1),
      totalPrice: formPrice.toFixed(1)
    });
  }

  formValue(item: ProductModel[]) {
    this.selectProducts.forEach(form => {
      if (form.id === item['id']) {
        Object.assign(form,{
          name: item['name'],
          price: item['price'],
          discount: item['discount'],
          description: item['description']
        });
      }
    });
    this.changePrice();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
