import { Component, OnInit } from '@angular/core';
import { Settings } from '../app.settings.model';
import { AppSettings } from '../app.settings';

@Component({
  selector: 'app-purchaseinformation',
  templateUrl: './purchaseinformation.component.html',
  styleUrls: ['./purchaseinformation.component.scss']
})
export class PurchaseinformationComponent implements OnInit {

  public settings: Settings;
  constructor(
      public appSettings: AppSettings,
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

}
