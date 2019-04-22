import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// tslint:disable-next-line:import-spacing
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { tap } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
interface MyData {
    tokenkey: string;
    token: string;
    success: boolean;
    message: string;
}
interface Message {
    status: string;
    success: boolean;
    message: string;

}
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // private loggedInStatus = JSON.parse(localStorage.getItem('access_details') || 'false');
    // tslint:disable-next-line:variable-name
    _token: any;
    // private _headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient) {
    }

    get isLoggined() {
        return sessionStorage.getItem('access_token') !== null;
    }
    getUserDetails(username: string, password: string) {
        return this.http.post<MyData>(environment.API_URL + '/users/user/login', { username, password }).pipe(tap(res => {
            if (res.success) {
                sessionStorage.setItem('access_token', res.token);
                sessionStorage.setItem('email', res.tokenkey);
                sessionStorage.setItem('purchased', 'false');
            } else {
                console.log(res.message);
            }
        }));
    }
    passwordTokengen(email: string) {
        return this.http.get<Message>(environment.API_URL + '/users/user/forget/' + email);
    }
    forgetPassword(password: string, token: string) {
        const encodedName = encodeURIComponent(password);
        console.log('encodedName--' + encodedName);
        return this.http.get<Message>(environment.API_URL + '/users/user/changepassword/' + encodedName + '/' + token);
    }
    checkPackageValidity(email: string) {
        return this.http.get<Message>(environment.API_URL + '/users/user/package/valid/' + email);
    }
}
