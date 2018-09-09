import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../http-service.service';
import {CartService} from '../cart.service';
import {MsgloaderService} from '../msgloader.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData = {
    username: '',
    pass: '',
    email: ''
  };
  inuserData = {
    usermail: '',
    pass: ''
  };
  userDataArray: { username: string; pass: string; email: string };
  inuserDataArray: {
    usermail: string,
    pass: string
  };
  responeMsg: string;
  private userDataJson: string;
  private date: Date;
  isLoggedin = false;
  private cookieValue: string;
  private username: string;
  constructor(public Httpservice: HttpServiceService, public  Cartservice: CartService, public msgloader: MsgloaderService, private cookieService: CookieService, private router: Router) { }
  signup() {
    this.userDataArray = {username: this.userData.username, pass: this.userData.pass, email: this.userData.email};
    this.userDataJson = JSON.stringify(this.userDataArray);
    this.Httpservice.signup(this.userDataJson)
      .subscribe(
        (response) => {
          this.msgloader.showMsg = true;
          this.msgloader.initMsg('ثبت نام شما با موفقیت انجام شد.', 'alert-success');
          this.msgloader.autoHide();
        }
      );
  }
  signin() {
    this.inuserDataArray = {usermail: this.inuserData.usermail, pass: this.inuserData.pass};
    this.userDataJson = JSON.stringify(this.inuserDataArray);
    this.Httpservice.signin(this.userDataJson)
      .subscribe(
        (response) => {
          this.msgloader.showMsg = true;
          if (response !== '') {
            this.responeMsg = 'با موفقیت وارد سایت شدید.';
            this.date = new Date();
            this.cookieService.set('session_id', response, this.date.getTime() + (90 * 24 * 60 * 60), '/');
            this.username = JSON.stringify(this.inuserData.usermail)
            this.cookieService.set('user', this.username.replace(/\"/g, ''), this.date.getTime() + (90 * 24 * 60 * 60), '/');
            this.isLoggedin = true;
          } else {
            this.responeMsg = 'نام کاربری یا رمز عبور اشتباه است.';
          }
          this.msgloader.initMsg(this.responeMsg, 'alert-success');
          this.router.navigate(['/product-category/blade']);
          this.msgloader.autoHide();
        }
      );
  }
  ngOnInit() {
    this.cookieValue = this.cookieService.get('user');
    if (this.cookieValue !== '') {
      this.inuserData.usermail = this.cookieValue;
      this.isLoggedin = true;
    }
  }

}
