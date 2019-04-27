import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';

@Component({
  selector: 'app-unauthorised',
  templateUrl: './unauthorised.component.html'
})
export class UnauthorisedComponent {
  public settings: Settings;
  constructor(public appSettings: AppSettings, public router: Router) {
    this.settings = this.appSettings.settings;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}