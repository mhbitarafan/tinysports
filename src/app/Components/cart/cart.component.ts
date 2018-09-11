import {Component, OnInit} from '@angular/core';
import {CartService} from '../../Services/cart.service';
import {MsgloaderService} from '../../Services/msgloader.service';
import {HttpServiceService} from '../../Services/http-service.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(public Cartservice: CartService, public  msgloader: MsgloaderService) { }
  ngOnInit() {
    this.Cartservice.checkCartData();
  }
}
