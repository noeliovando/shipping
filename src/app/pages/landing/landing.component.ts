import {Component, ViewEncapsulation, OnInit, AfterViewInit} from '@angular/core';
import { NguCarousel } from '@ngu/carousel';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { LandingService } from './landing.service';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [LandingService, AuthService],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit, AfterViewInit {
  public menuItems;
  public settings: Settings;
  constructor(
      public appSettings: AppSettings,
      private _landingservice: LandingService,
      private _authservice: AuthService,
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.menuItems = this._landingservice.getMenuItems();
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
