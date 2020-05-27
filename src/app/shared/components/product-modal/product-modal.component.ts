import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../service/product.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ProductModel} from "../../model/product.model";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit,OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  @Input() propertyObj: any;
  productForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private productService: ProductService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productForm = new FormGroup({
      name: new FormControl(this.propertyObj.name,[ Validators.required ]),
      description: new FormControl(this.propertyObj.description,[ Validators.required ]),
      price: new FormControl(this.propertyObj.price, [Validators.required])
    });
  }

  createProduct() {
    if ( this.productForm.value.price < 0 ) {
      this.toastrService.error("Поле ціна не може бути від'ємне");
    } else {
      this.productService.createProducts(this.productForm.value)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          (products: ProductModel[] ) => this.productSucces(products,'Продукт добавлено'),
          () => this.toastrService.error('Помилка добавлення продукту')
        );
    }
  }

  productSucces(products: ProductModel[], mess: string ) {
    this.toastrService.success(mess);
    this.dataService.sendUpdateProduct(products);
    this.activeModal.close(ProductModalComponent);
  }

  editProduct() {
    if (this.productForm.value.price < 0) {
      this.toastrService.error("Поле ціна не може бути від'ємне");
    } else {
      this.productForm.value.id = this.propertyObj.id;
      this.productService.editProducts(this.productForm.value)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          (products: ProductModel[]) => this.productSucces(products, 'Продукт обновлено'),
          () => this.toastrService.error('Помилка обновлення продукту')
        );
    }
  }

  onSubmit() {
    if ( this.propertyObj.buttonType === 'Добавити' ) {
      this.createProduct();
    } else {
      this.editProduct();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
