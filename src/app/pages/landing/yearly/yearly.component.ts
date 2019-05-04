import { Component, OnInit } from '@angular/core';
import { Package } from '../pricing/pricing.model';
import {LandingService } from '../landing.service';
import { AuthService } from '../../../services/auth.service';
import {Router } from '@angular/router';


@Component({
  selector: 'app-yearly',
  templateUrl: './yearly.component.html',
  providers: [LandingService]
})
export class YearlyComponent implements OnInit {
  public  packages: Package[];

  constructor(
      private _landingService: LandingService,
      private auth: AuthService,
      private route: Router
  ) { }

  ngOnInit() {
    this.getPackages();
  }

  getPackages() {
    this._landingService.getPackages().subscribe(
        response => {
          if (response) {
            this.packages = response;
            console.log(response);
          }
        },
        error => {
          console.log(<any>error);
        }
    );
  }
  onSelect(packageid) {
      if (this.auth.isLoggined) {
          if (sessionStorage.getItem('isPurchased') === 'false') {
              sessionStorage.setItem('packageid', packageid);
              sessionStorage.setItem('paymentstarted', 'true');
              this.route.navigate(['choosepayment']);
          } else {
              alert('You have already purchased Package');
          }
      } else {
          this.route.navigate(['login']);
      }

  }

}
