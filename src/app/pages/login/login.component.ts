import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { AuthService } from '../../services/auth.service';
import {User, UserSession} from '../users/user.model';
import {UsersService} from '../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UsersService]
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public settings: Settings;
  constructor(
      public appSettings: AppSettings,
      public fb: FormBuilder,
      public router: Router,
      private _authservice: AuthService,
      private _userservice: UsersService
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'rememberMe': false
    });
  }

  public onSubmit(values: Object): void {
    if (this.form.valid) {
     this.loginUser();
    }
  }
  loginUser() {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    // this.router.navigate(['/']);
    this._authservice.getUserDetails(email, password).subscribe(data => {
      if (data.success) {
        const u: UserSession = {username: email};
        this._userservice.setUserLoggedIn(u);
        this._authservice.checkPackageValidity(email).subscribe(expdata => {
          if (expdata.success) {
            if (expdata.message === 'Package Expired') {
              sessionStorage.setItem('isPurchased', 'false');
              alert(expdata.message);
              this.router.navigate(['']);
              this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() =>
                  this.router.navigate(['']));
            } else {
              if (expdata.message === 'Package not Purchased') {
                sessionStorage.setItem('isPurchased', 'false');
              } else {
                sessionStorage.setItem('isPurchased', 'true');
              }
              this.router.navigate(['']);
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                  this.router.navigate(['']));
            }
          }
        });

        // this.Auth.setLoggedIn(true);
      } else {
        sessionStorage.setItem('isPurchased', 'false');
        alert(data.message);
      }
    });
  }
  ngOnInit() {
    if (this._authservice.isLoggined) {
      this.router.navigate(['unauthorisedaccess']);
    }
  }
  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}