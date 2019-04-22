import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';

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
    public url: string;
    constructor(private http: HttpClient) {
        this.url = Global.url;
    }
    buyPackage(amount: string, currency: string) {
        return this.http.post<PayUrl>(this.url + '/paypal/make/payment?sum=' + amount + '&currency=' + currency, {});
    }
    makePayment(paymentId: string, PayerID: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.post<PaymentResponse>(this.url + '/paypal/complete/payment?paymentId=' + paymentId + '&PayerID=' + PayerID, {});
    }
    getPackageDetails(packageid: string) {
        return this.http.get(this.url + '/packages/get/' + packageid);
    }
    savePaymentDetails(email: string, packageid: string, paymentdetails: any) {
        return this.http.post(this.url + '/users/user/purchage/' + packageid + '/' + email, paymentdetails);
    }
    payupayment(paymentPayload: any){
    return this.http.post<any>(this.url + '/payu/payment-details', paymentPayload);
    }
}
