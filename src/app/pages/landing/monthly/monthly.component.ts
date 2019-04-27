import { Component, OnInit } from '@angular/core';
import { Package } from '../pricing/pricing.model';
import {LandingService } from '../landing.service';


@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  providers: [LandingService]
})
export class MonthlyComponent implements OnInit {
  public  packages: Package[];

  constructor(
      private _landingService: LandingService,
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
}
