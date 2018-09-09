import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../http-service.service';
import {CartService} from '../cart.service';
import {MsgloaderService} from '../msgloader.service';
import {MediaMatcher} from '@angular/cdk/layout';

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
  private userDataJson: string;
  constructor(public Httpservice: HttpServiceService, public  Cartservice: CartService, public msgloader: MsgloaderService) { }
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
          this.msgloader.initMsg(response, 'alert-success');
          this.msgloader.autoHide();
        }
      );
  }
  ngOnInit() {
  }

}
