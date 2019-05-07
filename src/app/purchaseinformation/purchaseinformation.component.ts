import { Component, OnInit } from '@angular/core';
import { Settings } from '../app.settings.model';
import { AppSettings } from '../app.settings';
import { Package} from '../pages/landing/pricing/pricing.model';
import {PaymentService} from '../services/payment.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchaseinformation',
  templateUrl: './purchaseinformation.component.html',
  styleUrls: ['./purchaseinformation.component.scss'],
  providers: [PaymentService, AuthService]
})
export class PurchaseinformationComponent implements OnInit {
  public settings: Settings;
  public package: Package;
  constructor(
      public appSettings: AppSettings,
      private _paymentService: PaymentService,
      private _authService: AuthService,
      private router: Router
  ) {
    this.settings = this.appSettings.settings;
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
  onSelect() {
    this.router.navigate(['payment']);
  }
  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

}
