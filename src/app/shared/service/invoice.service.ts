import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "../API/api-base.service";
import {Observable, Subject} from "rxjs";
import {InvoiceModel} from "../model/invoice.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends ApiBaseService{

  private subject = new Subject<any>();

  constructor(public http: HttpClient) {
    super(http);
  }

  getInvoices(): Observable<InvoiceModel[]> {
    return this.get('invoice');
  }

  addInvoice(invoice: any): Observable<InvoiceModel[]> {
    return this.post('invoice/create', invoice);
  }

  removeInvoice(invoice: InvoiceModel[]): Observable<InvoiceModel[]> {
    return this.delete(`invoices/delete/${invoice['id']}`, invoice);
  }

  getSelectInvoice(id: string): Observable<InvoiceModel[]> {
    return this.get(`invoice/select/${id}`);
  }

  getSelectInvAndProducts(id: string): Observable<InvoiceModel[]> {
    return this.get(`invoice/selectinv/${id}`);
  }

  editInvoice(invoice: InvoiceModel[]): Observable<InvoiceModel[]> {
    return this.put(`invoice/edit/${invoice['id']}`, invoice);
  }

  sendUpdateInvoice(invoice: InvoiceModel[]) {
    this.subject.next(invoice);
  }

  getUpdateData(): Observable<any> {
    return this.subject.asObservable();
  }

}
