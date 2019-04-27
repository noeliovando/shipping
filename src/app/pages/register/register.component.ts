import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { RegisterService } from '../../services/register.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public settings: Settings;

  constructor(
      public appSettings: AppSettings,
      private _registerservice: RegisterService,
      private _authservice: AuthService,
      public fb: FormBuilder, public router: Router) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'firstname': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'surname': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    }, {validator: matchingPasswords('password', 'confirmPassword')});
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.registerUser();
    }
  }
  registerUser() {
    const firstname = this.form.get('firstname').value;
    const surname = this.form.get('surname').value;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this._registerservice.registerUser(firstname, surname, email, password).subscribe(data => {
      if (data.success) {
        alert(data.message + '. Plese check your email.');
        this.router.navigate(['']);
      } else {
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
