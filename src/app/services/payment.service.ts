import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

interface PayUrl {
    redirect_url: string;
    status: string;
}
interface PaymentResponse {
    paymentId: string;
    amount: string;
    currency: string;
    transactionid: string;
    paymentstatus: boolean;
    payorEmail: string;
}

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(private http: HttpClient) { }
    buyPackage(amount: string, currency: string) {
        return this.http.post<PayUrl>(environment.API_URL + '/paypal/make/payment?sum=' + amount + '&currency=' + currency, {});
    }
    makePayment(paymentId: string, PayerID: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.post<PaymentResponse>(environment.API_URL + '/paypal/complete/payment?paymentId=' + paymentId + '&PayerID=' + PayerID, {});
    }
    getPackageDetails(packageid: string) {
        return this.http.get(environment.API_URL + '/packages/get/' + packageid);
    }
    savePaymentDetails(email: string, packageid: string, paymentdetails: any) {
        return this.http.post(environment.API_URL + '/users/user/purchage/' + packageid + '/' + email, paymentdetails);
    }
    payupayment(paymentPayload: any){
    return this.http.post<any>(environment.API_URL+ '/payu/payment-details', paymentPayload);
    }
}
