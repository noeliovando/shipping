import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-spacing
import { Global } from './global';

interface MyData {
    success: boolean;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    public url: string;
    private registerStatus = false;
    constructor(private http: HttpClient) {
        this.url = Global.url;
    }

    setRegisterStatus(value: boolean) {
        this.registerStatus = value;
    }
    get isRegistered() {
        return this.registerStatus;
    }
    registerUser(fname, lname, email, password) {
        const encodedName = encodeURIComponent(password);
        const apiurl = this.url + '/users/user/register/' + fname + '/' + lname + '/' + encodedName + '/' + email;
        return this.http.get<MyData>(apiurl);
    }
    verifyOtp(otp) {
        const apiurl = this.url + '/users/user/confirm/' + otp;
        return this.http.get<MyData>(apiurl);
    }
}
