import {Injectable} from '@angular/core';
import {HttpServiceService} from './http-service.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  hasHeader = true;
  private checkuserData = {
    usermail: '',
    session_id: ''
  };
  private checkuserDataArray = {
    usermail: '',
    session_id: ''
  };
  private userDataJson: string;

  constructor(public Httpservice: HttpServiceService, public cookieService: CookieService) {
  }

  isLoggedin = false;

  checkLoginData() {
    this.checkuserData.usermail = JSON.parse(this.cookieService.get('user')).username;
    this.checkuserData.session_id = this.cookieService.get('session_id');
    this.checkuserDataArray = {usermail: this.checkuserData.usermail, session_id: this.checkuserData.session_id};
    this.userDataJson = JSON.stringify(this.checkuserDataArray);
    this.Httpservice.checkLoginData(this.userDataJson)
      .subscribe(
        (response) => {
          if (response !== '') {
            this.isLoggedin = true;
          } else {
            this.isLoggedin = false;
          }
        }
      );
  }

}
