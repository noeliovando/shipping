import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator } from '../theme/utils/app-validators';
import { AppSettings } from '../app.settings';
import { Settings } from '../app.settings.model';
import { Package} from '../pages/landing/pricing/pricing.model';
import { PaymentService} from '../services/payment.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [PaymentService, AuthService]
})
export class PaymentComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public settings: Settings;
  public package: Package;
  public paypalIsSelected: boolean;
  public payuIsSelected: boolean;
  constructor(
      public appSettings: AppSettings,
      public fb: FormBuilder,
      public router: Router,
      private _paymentService: PaymentService,
      private _authService: AuthService,
  ) {
    this.settings = this.appSettings.settings;
    this.paypalIsSelected = false;
    this.payuIsSelected = false;
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'rememberMe': false
    });
  }
  getPackage(packageid) {
    this._paymentService.getPackageDetails(packageid).subscribe(data => {
      this.package = data;
    });
  }
  ngOnInit() {
    if (this._authService.isLoggined && sessionStorage.getItem('paymentstarted')) {
      const packageid = sessionStorage.getItem('packageid');
      console.log(packageid);
      this.getPackage(packageid);
    } else {
      this.router.navigate(['']);
    }
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
    if (method === 'checkout') {
      if (this.paypalIsSelected) {
        this.makePayment(this.package.baseprice, this.package.currency);
      }
    }
  }
  makePayment(price, currency) {
    document.getElementById('btncheckout').innerHTML = 'Processing...';
    this._paymentService.buyPackage(price, currency).subscribe(data => {
      if (data.status === 'success') {
        window.location.href = data.redirect_url;
      } else {
        alert('Error occured!');
      }
    });
  }
  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
