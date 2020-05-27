export interface InvoiceModel {
  name: string;
  data: string;
  id?: number;
  totalPrice: number;
  products: [
    {
      name: string,
      description: string,
      select: string,
      price: number,
      discount: number ,
      count: number,
      id?:  number
    }
  ];
}
