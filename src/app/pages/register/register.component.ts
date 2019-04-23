import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [RegisterService]
})
export class RegisterComponent {
  public form: FormGroup;
  public settings: Settings;
  public status: string;
  public message: string;
  firstname = new FormControl('');
  surname = new FormControl('');
  password = new FormControl('');
  email = new FormControl('');

  constructor(
      public appSettings: AppSettings,
      private _registerservice: RegisterService,
      public fb: FormBuilder, public router: Router
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'firstname': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'surname': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    }, {validator: matchingPasswords('password', 'confirmPassword')});
  }

  public onSubmit(event): void {
    // if (this.form.valid) {
      // this.router.navigate(['/login']);
      this._registerservice.registerUser(this.firstname, this.surname, this.email, this.password).subscribe(data => {
        // event.preventDefault();
        // const target = event.target;
        if (data.success) {
          this.status = 'success';
          this.router.navigate(['']);
        } else {
          this.status = 'failed'
          this.message = data.message;
        }
      });
    // }
  }
}
