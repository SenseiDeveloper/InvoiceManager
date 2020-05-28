import { Injectable } from '@angular/core';
import {InvoiceFormModel} from "../model/invoice-form.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceFormsService {

  state:boolean = true;
  forms: InvoiceFormModel[] = [];

  constructor() { }

  getForms(forms: InvoiceFormModel){
    if( !this.forms.length ){
      this.forms.push(forms);
    } else {
      let findForm = this.forms.find(el => el.id === forms.id);
      if (!findForm) {
        this.forms.push(forms);
      } else {
        this.forms.forEach(el => {
          el.id === forms.id ? el.status = forms.status: false;
        })
      }
    }
  }

  setStatus() {
    if(!this.forms){
      return this.state = true;
    } else {
      let statusArray = this.forms.map(el=> el.status);
      statusArray.includes('INVALID') ? this.state = false: this.state = true;
      }
  }

  getStatus(){
    this.setStatus();
    return this.state;
  }
}
