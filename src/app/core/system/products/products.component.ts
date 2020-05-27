import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {ProductModel} from "../../../shared/model/product.model";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../../shared/service/product.service";
import {DataService} from "../../../shared/service/data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {takeUntil} from "rxjs/operators";
import {ProductModalComponent} from "../../../shared/components/product-modal/product-modal.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  defaultProducts: ProductModel[];
  products = new MatTableDataSource<ProductModel>();
  select: string = 'default';
  displayedColumns: string[] = [ 'position', 'name', 'description', 'price', 'action'];
  isLoad: boolean = false;

  constructor(
    private productService: ProductService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.initProducts();
    this.updateData();
  }

  initProducts() {
    this.productService.getProducts()
      .pipe( takeUntil(this.unsubscribe) )
      .subscribe( (products: ProductModel[]) => {
        this.products.data = products;
        this.defaultProducts = products;
        setTimeout(() => this.isLoad = true, 500);
      });
  }

  updateData() {
    this.dataService.getUpdateData()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (products: ProductModel[]) => {
          this.products.data = products;
          this.defaultProducts = products;
        }
      );
  }

  filterName() {
    let filter = [...this.defaultProducts];
    filter.sort((one, two) => {
      if (one.name < two.name) return -1;
      if (one.name > two.name) return 1;
      return 0;
    });
    return filter;
  }

  filterPrice() {
    let filter = [...this.defaultProducts];
    filter.sort((one, two) => {
      if (one.price < two.price) return -1;
      if (one.price > two.price) return 1;
      return 0;
    });
    return filter;
  }

  selectFilter(event) {
    if (event.value === 'default') {
      this.products.data = this.defaultProducts;
    } else if (event.value === 'nameup') {
      this.products.data = this.filterName();
    } else if (event.value === 'namedown') {
      this.products.data = this.filterName().reverse();
    } else if (event.value === 'priceup') {
      this.products.data = this.filterPrice().reverse();
    } else if (event.value === 'pricedown') {
      this.products.data = this.filterPrice();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }

  deteleProduct(product: ProductModel[]) {
    this.productService.deteleProducts(product)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (products: ProductModel[])  => this.successDeleteProduct(products),
        () => this.toastrService.success('Помилка видалення продукту')
      );
  }

  successDeleteProduct(products: ProductModel[]) {
    this.products.data = products;
    this.defaultProducts = products;
    this.toastrService.success('Продукт видалено');
  }

  dublicateProduct(product: ProductModel[]) {
    this.productService.dublicateProducts(product)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (products: ProductModel[]) => this.successDublicateProduct(products),
        () => this.toastrService.error('Помилка дублювання продукту')
      );
  }

  successDublicateProduct(products: ProductModel[]) {
    this.products.data = products ;
    this.defaultProducts = products;
    this.toastrService.success('Продукт продубльовано');
  }

  createProduct() {
    const modalRef = this.modalService.open(ProductModalComponent);
    const propertyObj = {
      title: 'Добавити продукт',
      name: '',
      description: '',
      price: '',
      buttonType: 'Добавити'
    };
    modalRef.componentInstance.propertyObj = propertyObj;
  }

  editProduct(product: ProductModel) {
    const modalRef = this.modalService.open(ProductModalComponent);
    const propertyObj = {
      title : 'Редагувати продукт',
      name: product.name,
      description: product.description,
      price: product.price,
      buttonType: 'Редагувати',
      id: product.id
    };
    modalRef.componentInstance.propertyObj = propertyObj;
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
