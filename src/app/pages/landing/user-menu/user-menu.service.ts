import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// tslint:disable-next-line:import-spacing
import { Global} from '../../../services/global';
import { Observable } from 'rxjs/index';
import {UserSession } from '../../../pages/users/user.model';

@Injectable()
export class UserMenuService {
    public url: string;
    public user: UserSession;
    constructor(
        private http: HttpClient,
    ) {
        this.url = Global.url;
    }
    getUser(): Observable<any>  {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        return this.http.get(this.url + 'users/user/' + this.user.username, { headers: headers });
    }
}
