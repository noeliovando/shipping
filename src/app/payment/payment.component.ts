import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator } from '../theme/utils/app-validators';
import { AppSettings } from '../app.settings';
import { Settings } from '../app.settings.model';
import { MatTableDataSource } from '@angular/material';
import {TablesService, Element} from '../pages/tables/tables.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public form: FormGroup;
  public settings: Settings;
  public dataSource: any;
  public paypalIsSelected: boolean;
  public payuIsSelected: boolean;
  public displayedColumns = ['position', 'name', 'weight', 'symbol'];
  public data: Element[] = [
    {position: 1, name: 'Product 1', weight: 100, symbol: '1'},
    {position: 2, name: 'Product 2', weight: 200, symbol: '2'},
    {position: 3, name: 'Product 3', weight: 300, symbol: '1'},
  ];
  constructor(
      public appSettings: AppSettings,
      public fb: FormBuilder,
      public router: Router
  ) {
    this.settings = this.appSettings.settings;
    this.paypalIsSelected = false;
    this.payuIsSelected = false;
    this.dataSource = new MatTableDataSource<Element>(this.data);
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'rememberMe': false
    });
  }
  ngOnInit() {
  }
  onSelect(method) {
    if (method === 'paypal') {
      this.paypalIsSelected = !this.paypalIsSelected;
      if (this.payuIsSelected && this.paypalIsSelected) {
        this.payuIsSelected = false;
      }
      console.log('paypal' + this.paypalIsSelected);
    }
    if (method === 'payu') {
      this.payuIsSelected = !this.payuIsSelected;
      if (this.payuIsSelected && this.paypalIsSelected) {
        this.paypalIsSelected = false;
      }
      console.log('payu' + this.payuIsSelected);
    }
  }
  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
