import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart.service';
import {MsgloaderService} from '../msgloader.service';
import {HttpServiceService} from '../http-service.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  private cookieValue: string;
  private date: Date;

  constructor(public Cartservice: CartService, public  msgloader: MsgloaderService, private cookieService: CookieService, private Httpservice: HttpServiceService) {
  }

  updateCart() {
    this.date = new Date();
    this.cookieService.set('cartData', JSON.stringify(this.Cartservice.cartData), this.date.getTime() + (100 * 24 * 60 * 60 * 1000), '/');
  }

  submitOrder() {
    this.Httpservice.submitOrderDB(JSON.stringify(this.Cartservice.cartData))
      .subscribe(
        (response) => {
          this.msgloader.showMsg = true;
          this.msgloader.initMsg('سفارش شما با موفقیت ثبت شد.', 'alert-success');
          this.msgloader.autoHide();
          this.Cartservice.cartData = [];
          this.updateCart();
        }
      );
  }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('cartData');
    if (this.cookieValue !== '') {
      this.Cartservice.cartData = JSON.parse(this.cookieValue);
    }
  }
}
