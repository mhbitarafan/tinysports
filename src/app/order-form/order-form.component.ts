import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  inuserData = {usermail: ''};
  private cookieValue: string;

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('user');
    if (this.cookieValue !== '') {
      this.inuserData.usermail = this.cookieValue;
    }
  }

}
