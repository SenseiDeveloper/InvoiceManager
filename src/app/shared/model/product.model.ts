export interface ProductModel {
  name: string;
  description: string;
  price: number;
  discount?: number;
  count?: number;
  readonly id?: number;
}
