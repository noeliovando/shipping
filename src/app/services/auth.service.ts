import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAllInfo } from '../pages/users/user.model';
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
    public url: string;
    private currentUserSubject: BehaviorSubject<UserAllInfo>;
    public currentUser: Observable<UserAllInfo>;
    constructor(
        private http: HttpClient,
    ) {
        this.url = Global.url;
    }
    get isLoggined() {
        return sessionStorage.getItem('access_token') !== null;
    }
    getUserDetails(username: string, password: string) {
        return this.http.post<MyData>(this.url + 'users/user/login', { username, password }).pipe(tap(res => {
            if (res.success) {
                sessionStorage.setItem('access_token', res.token);
                sessionStorage.setItem('email', res.tokenkey);
                sessionStorage.setItem('purchased', 'false');
            } else {
                console.log(res.message);
            }
        }));
    }
    checkPackageValidity(email: string) {
        return this.http.get<Message>(this.url + 'users/user/package/valid/' + email);
    }
}
