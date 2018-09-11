import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  inuserData = {username: '', email: ''};
  private username: string;
  private email: string;

  constructor(private cookieService: CookieService) {
  }

  ngOnInit() {
  }
}
