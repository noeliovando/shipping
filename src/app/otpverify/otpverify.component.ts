import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-otpverify',
    templateUrl: './otpverify.component.html',
    styleUrls: ['./otpverify.component.css']
})
export class OtpverifyComponent implements OnInit {

    constructor(private reg: RegisterService, private route: Router) {

    }

    ngOnInit() {
        const parameters = new URLSearchParams(window.location.search);
        console.log(parameters.get('token'));
        const token = parameters.get('token');
        if (token !== null && token !== 'null') {
            this.reg.verifyOtp(token).subscribe(data => {
                if (data.success) {
                    alert(data.message);
                    this.route.navigate(['login']);
                } else {
                    alert(data.message);
                    this.route.navigate(['']);
                }
            });
        } else {
            this.route.navigate(['unauthorisedaccess']);
        }
    }

}
