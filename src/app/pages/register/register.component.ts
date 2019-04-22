import { Component , OnInit} from '@angular/core';
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
      private reg: RegisterService,
      private auth: AuthService,
      public appSettings: AppSettings,
      public fb: FormBuilder,
      public router: Router) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    }, {validator: matchingPasswords('password', 'confirmPassword')});
  }

  public onSubmit(values: Object): void {
    if (this.form.valid) {
      this.router.navigate(['/login']);
    }
  }
  register(event) {
    event.preventDefault();
    const target = event.target;
    const fname = target.querySelector('#fname').value;
    const lname = target.querySelector('#lname').value;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    this.reg.registerUser(fname, lname, email, password).subscribe(data => {
      if (data.success) {
        alert(data.message + '. Plese check your email.');
        this.router.navigate(['']);
      } else {
        alert(data.message);
      }
    });
  }
  ngOnInit() {
    if (this.auth.isLoggined) {
      this.router.navigate(['unauthorisedaccess']);
    }
  }
  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
