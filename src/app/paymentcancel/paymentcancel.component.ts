import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../services/auth.service';

@Component({
    selector: 'app-paymentcancel',
    templateUrl: './paymentcancel.component.html',
    styleUrls: ['./paymentcancel.component.css']
})
export class PaymentcancelComponent implements OnInit {

    constructor(private auth: AuthService, private route: Router) { }

    tryCheckout() {
        sessionStorage.setItem('paymentstarted', 'true');
        this.route.navigate(['checkout']);
    }
    ngOnInit() {
        if (this.auth.isLoggined && sessionStorage.getItem('paymentstarted')) {
            sessionStorage.removeItem('paymentstarted');
        } else {
            this.route.navigate(['']);
        }
    }

}
