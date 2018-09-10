import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpServiceService} from './http-service.service';
import {MsgloaderService} from './msgloader.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private alreadyExists: boolean;
  private total: number;
  private date: Date;
  private cartDataCookie: string;
  cartData: [{
    title: string,
    price: number,
    number: number
  }];
  public addedToCart: string;
  private number = 1;

  constructor(public cookieService: CookieService, public  Httpservice: HttpServiceService, public msgloader: MsgloaderService, public router: Router) { }

  checkCartData() {
    this.cartDataCookie = this.cookieService.get('cartData');
    if (this.cartDataCookie !== '') {
      this.cartData = JSON.parse(this.cartDataCookie);
    }
  }

  addToCart(productTitle: string, Price: number) {
    this.checkCartData();
    this.alreadyExists = false;
    this.addedToCart = productTitle;
    this.msgloader.initMsg('به سبد خرید افزوده شد.', 'alert-success', true);
    try {
      for (let i = 0; i < this.cartData.length; i++) {
        if (this.cartData[i].title === productTitle) {
          this.alreadyExists = true;
          this.number = this.cartData[i].number++;
          console.log(this.cartData[i].number);
          return;
        }
      }
      this.cartData.push({title: productTitle, price: Price, number: this.number});
      this.updateCartCookie();
      this.date = new Date();
      this.cookieService.set( 'cartData', JSON.stringify(this.cartData) , this.date.getTime() + (100 * 24 * 60 * 60 * 1000) , '/' );
    }    catch (e) {}
  }

  calcTotal() {
    this.total = 0;
    for (let i = 0; i < this.cartData.length; i++) {
      this.total += this.cartData[i].price * this.cartData[i].number;
    }
    return this.total;
  }

  updateCartCookie() {
    this.date = new Date();
    this.cookieService.set('cartData', JSON.stringify(this.cartData), this.date.getTime() + (100 * 24 * 60 * 60 * 1000), '/');
  }

  submitOrder() {
    this.Httpservice.submitOrderDB(JSON.stringify(this.cartData))
      .subscribe(
        (response) => {
          this.msgloader.initMsg('سفارش شما با موفقیت ثبت شد.', 'alert-success', true);
          this.cartData = [{title: '', number: 1, price: 1}];
          this.updateCartCookie();
          this.router.navigate(['/product-category/blade']);
        }
      );
  }
}
