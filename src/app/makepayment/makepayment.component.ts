import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService} from '../services/auth.service';
import { PaymentService} from '../services/payment.service';

@Component({
    selector: 'app-makepayment',
    templateUrl: './makepayment.component.html',
    styleUrls: ['./makepayment.component.css']
})
export class MakepaymentComponent implements OnInit {

    paymentData;
    constructor(private router: Router, private route: ActivatedRoute, private payment: PaymentService, private auth: AuthService) { }
    makePayment() {
        const parameters = this.route.snapshot.queryParamMap;
        console.log('paymentId...>' + parameters.get('paymentId'));
        console.log('PayerID...>' + parameters.get('PayerID'));
        // tslint:disable-next-line:max-line-length
        if (sessionStorage.getItem('paymentstarted') === 'true') {
            this.payment.makePayment(parameters.get('paymentId'), parameters.get('PayerID')).subscribe(
                data => {
                    // tslint:disable-next-line:max-line-length
                    this.payment.savePaymentDetails(sessionStorage.getItem('email'), sessionStorage.getItem('packageid'), data).subscribe(paydata => {
                        this.paymentData = paydata;
                        if (this.paymentData.success) {
                            sessionStorage.removeItem('packageid');
                            sessionStorage.setItem('isPurchased', 'true');
                            this.router.navigate(['paymentsuccess']);
                        }
                    });
                },
                (err: HttpErrorResponse) => {
                    console.log(err.message.toString);
                });
        } else {
            this.router.navigate(['']);
        }
    }
    ngOnInit() {
        if (this.auth.isLoggined) {
            this.makePayment();
        } else {
            this.router.navigate(['']);
        }
    }

}
