import {Component, OnInit} from '@angular/core';
import {HttpServiceService} from '../../Services/http-service.service';
import {CartService} from '../../Services/cart.service';
import {MsgloaderService} from '../../Services/msgloader.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {GeneralService} from '../../Services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  responeMsg: string;
  private userDataJson: string;
  private userDataCookieJson: string;
  private date: Date;
  private cookieValue: string;
  private username: string;
  private session_id: string;
  private email: string;
  signUpuserData = {
    username: '',
    pass: '',
    email: ''
  };
  loginUserData = {
    usermail: '',
    pass: ''
  };
  private userDataCookie = {
    username: '',
    email: ''
  };
  constructor(public Httpservice: HttpServiceService, public  Cartservice: CartService, public msgloader: MsgloaderService, private cookieService: CookieService, private router: Router, public general: GeneralService) {
    this.isDialogClosed = true;
  }
  isDialogClosed: boolean;
  Closemodal() {
    this.isDialogClosed = true;
  }
  signup() {
    this.userDataJson = JSON.stringify(this.signUpuserData);
    this.Httpservice.signup(this.userDataJson)
      .subscribe(
        (response) => {
          this.msgloader.showMsg = true;
          this.msgloader.initMsg('ثبت نام شما با موفقیت انجام شد.', 'alert-success', true);
          this.signUpuserData = {
            username: '',
            pass: '',
            email: ''
          };
        }
      );
  }
  Login() {
    this.userDataJson = JSON.stringify(this.loginUserData);
    this.Httpservice.signin(this.userDataJson)
      .subscribe(
        (response) => {
          if (response !== '') {
            response = JSON.parse(response);
            this.responeMsg = 'با موفقیت وارد سایت شدید.';
            this.date = new Date();
            this.cookieService.set('session_id', response.session_id, this.date.getTime() + (90 * 24 * 60 * 60), '/');
            this.username = response.username;
            this.email = response.email;
            this.userDataCookie = {username: this.username, email: this.email};
            this.userDataCookieJson = JSON.stringify(this.userDataCookie);
            this.cookieService.set('user', this.userDataCookieJson, this.date.getTime() + (90 * 24 * 60 * 60), '/');
            this.general.isLoggedin = true;
            this.msgloader.initMsg(this.responeMsg, 'alert-success', true);
            this.router.navigate(['/product-category/blade']);
          } else {
            this.responeMsg = 'نام کاربری یا رمز عبور اشتباه است.';
          }
          this.msgloader.initMsg(this.responeMsg, 'alert-success', true);
          this.isDialogClosed = false;
        }
      );
  }
  logout() {
    this.cookieService.delete('user');
    this.cookieService.delete('session_id');
    this.general.isLoggedin = false;
    this.msgloader.showMsg = true;
    this.msgloader.initMsg('با موفقیت خارج شدید.', 'alert-success', true);
  }
  ngOnInit() {
    this.session_id = this.cookieService.get('session_id');
    try {
      this.cookieValue = JSON.parse(this.cookieService.get('user')).username;
    }    catch (e) {
      this.general.isLoggedin = false;
      this.session_id = '';
    }
    if (this.session_id !== '') {
      this.general.isLoggedin = true;
      this.loginUserData.usermail = this.cookieValue;
      this.general.checkLoginData();
    }
  }
}

