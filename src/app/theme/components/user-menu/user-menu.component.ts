import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserMenuService } from './user-menu.service';
import { UserAllInfo } from '../../../pages/users/user.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [UserMenuService]
})
export class UserMenuComponent implements OnInit {
  public  user: UserAllInfo;
  public userImage = 'assets/img/users/user.jpg';
  constructor(
      private _usermenuservice: UserMenuService
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }
  getUserInfo() {
    this._usermenuservice.getUser().subscribe(
        response => {
          if (response) {
            this.user = response;
          }
        },
        error => {
          console.log(<any>error);
        }
    );
  }

}
