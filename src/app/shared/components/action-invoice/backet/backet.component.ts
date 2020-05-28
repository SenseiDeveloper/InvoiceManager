import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ProductModel} from "../../../model/product.model";
import {InvoiceFormsService} from "../../../service/invoice-forms.service";

@Component({
  selector: 'app-backet',
  templateUrl: './backet.component.html',
  styleUrls: ['./backet.component.scss']
})
export class BacketComponent implements OnInit, OnDestroy {

  invoiceForms: FormGroup;
  unsubscribe: Subject<void> = new Subject<void>();
  @Input() itm: ProductModel[];
  @Output() valueChange = new EventEmitter<ProductModel[]>();

  constructor(
    private invoiceFromsService: InvoiceFormsService
  ) { }

  ngOnInit() {
    this.initForm(this.itm);
    this.detectValue();
  }

  initForm(itm: ProductModel[]) {
    this.invoiceForms = new FormGroup({
      id: new FormControl(itm['id'], Validators.required),
      name: new FormControl(itm['name'], Validators.required),
      price: new FormControl(itm['price'], [Validators.required,Validators.min(1)]),
      count: new FormControl(itm['count'],[Validators.required,Validators.min(1)]),
      discount: new FormControl(itm['discount'], [Validators.required,Validators.min(0),Validators.max(100)]),
      description: new FormControl(itm['description'], Validators.required)
    });
  }

  detectValue() {
    this.invoiceForms.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((item: ProductModel[]) => {
        this.valueChange.emit(item);
        const newForms = Object.assign({id:item['id'], status: this.invoiceForms.status});
        this.invoiceFromsService.getForms(newForms);
      });
  }


  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
