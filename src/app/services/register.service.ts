import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-spacing
import { environment } from '../environments/environment';

interface MyData {
    success: boolean;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private registerStatus = false;
    constructor(private http: HttpClient) { }

    setRegisterStatus(value: boolean) {
        this.registerStatus = value;
    }
    get isRegistered() {
        return this.registerStatus;
    }
    registerUser(fname, lname, email, password) {
        const encodedName = encodeURIComponent(password);
        const apiurl = environment.API_URL + '/users/user/register/' + fname + '/' + lname + '/' + encodedName + '/' + email;
        return this.http.get<MyData>(apiurl);
    }
    verifyOtp(otp) {
        const apiurl = environment.API_URL + '/users/user/confirm/' + otp;
        return this.http.get<MyData>(apiurl);
    }
}
