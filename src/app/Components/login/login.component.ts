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
  userData = {
    username: '',
    pass: '',
    email: ''
  };
  inuserData = {
    usermail: '',
    pass: ''
  };
  checkuserData = {
    usermail: '',
    session_id: ''
  };
  userDataArray: { username: string; pass: string; email: string };
  inuserDataArray: {
    usermail: string,
    pass: string
  };
  checkuserDataArray: {
    usermail: string,
    session_id: string
  };
  responeMsg: string;
  private userDataJson: string;
  private userDataCookieJson: string;
  private date: Date;
  private cookieValue: string;
  private username: string;
  private session_id: string;
  private email: string;
  private userDataCookie = {
    username: '',
    email: ''
  };
  constructor(public Httpservice: HttpServiceService, public  Cartservice: CartService, public msgloader: MsgloaderService, private cookieService: CookieService, private router: Router, public general: GeneralService) {
    this.isClosed = true;
  }
  isClosed: boolean;
  Closemodal() {
    this.isClosed = true;
  }
  signup() {
    this.userDataArray = {username: this.userData.username, pass: this.userData.pass, email: this.userData.email};
    this.userDataJson = JSON.stringify(this.userDataArray);
    this.Httpservice.signup(this.userDataJson)
      .subscribe(
        (response) => {
          this.msgloader.showMsg = true;
          this.msgloader.initMsg('ثبت نام شما با موفقیت انجام شد.', 'alert-success');
          this.msgloader.autoHide();
          this.userData = {
            username: '',
            pass: '',
            email: ''
          };
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
            this.msgloader.initMsg(this.responeMsg, 'alert-success');
            this.router.navigate(['/product-category/blade']);
          } else {
            this.responeMsg = 'نام کاربری یا رمز عبور اشتباه است.';
            this.msgloader.initMsg(this.responeMsg, 'alert-success');
          }
          this.isClosed = false;
          this.msgloader.autoHide();
        }
      );
  }
  logout() {
    this.cookieService.delete('user');
    this.cookieService.delete('session_id');
    this.general.isLoggedin = false;
    this.msgloader.showMsg = true;
    this.msgloader.initMsg('با موفقیت خارج شدید.', 'alert-success');
    this.msgloader.autoHide();
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
      this.inuserData.usermail = this.cookieValue;
      this.general.checkLoginData();
    }
  }
}

