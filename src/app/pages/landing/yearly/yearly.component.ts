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
      private _landingservice: LandingService,
      private _authservice: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
    this.getPackages();
  }

  getPackages() {
    this._landingservice.getPackages().subscribe(
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
      if (this._authservice.isLoggined) {
          if (sessionStorage.getItem('isPurchased') === 'false') {
              sessionStorage.setItem('packageid', packageid);
              sessionStorage.setItem('paymentstarted', 'true');
              this.router.navigate(['payment']);
          } else {
              alert('You have already purchased Package');
          }
      } else {
          this.router.navigate(['login']);
      }

  }

}
