import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent implements OnInit {

  @Input() idInvoice: number;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  editInvoice() {
    this.router.navigate([`system/invoice/edit/${this.idInvoice}`]);
  }
}
