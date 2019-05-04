import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { Global} from '../services/global';

@Component({
    selector: 'app-paymentsuccess',
    templateUrl: './paymentsuccess.component.html',
    styleUrls: ['./paymentsuccess.component.css']
})
export class PaymentsuccessComponent implements OnInit {
    purchasedData;
    public url: string;
    constructor(private http: HttpClient, private auth: AuthService, private route: Router) {
        this.url = Global.url;
    }
    getPaymentDetails() {
        this.http.get(this.url + 'users/user/' + sessionStorage.getItem('email')).subscribe(data => {
            this.purchasedData = data;
        });
    }
    ngOnInit() {
        if (this.auth.isLoggined && sessionStorage.getItem('paymentstarted') === 'true') {
            this.getPaymentDetails();
            sessionStorage.removeItem('paymentstarted');
        } else {
            this.route.navigate(['']);
        }
    }

}
