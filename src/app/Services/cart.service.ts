import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpServiceService} from './http-service.service';
import {MsgloaderService} from './msgloader.service';
import {Router} from '@angular/router';
import {CartData} from '../Models/CartData.Model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private alreadyExists: boolean;
  private total: number;
  private date: Date;
  private cartDataCookie: string;
  public addedToCart: string;
  cartData: CartData[] = [];

  constructor(public cookieService: CookieService, public  Httpservice: HttpServiceService, public msgloader: MsgloaderService, public router: Router) { }

  checkCartData() {
    this.cartDataCookie = this.cookieService.get('cartData');
    if (this.cartDataCookie !== '') {
      return this.cartData = JSON.parse(this.cartDataCookie);
    }
  }

  updateCartCookie() {
    this.date = new Date();
    this.cookieService.set('cartData', JSON.stringify(this.cartData), this.date.getTime() + (100 * 24 * 60 * 60 * 1000), '/');
  }

  addToCart(productTitle: string, Price: number) {
    this.alreadyExists = false;
    this.addedToCart = productTitle;
    this.msgloader.initMsg('به سبد خرید افزوده شد.', 'alert-success', true);
    if (this.cartData !== undefined) {
      for (let i = 0; i < this.cartData.length; i++) {

        if (this.cartData[i].title === productTitle) {
          this.alreadyExists = true;
          this.cartData[i].number++;
        }
      }
    }
    if (!this.alreadyExists) {
      this.cartData.push({title: productTitle, price: Price, number: 1});
    }
    this.updateCartCookie();
  }

  calcTotal() {
    this.total = 0;
    if (this.cartData !== undefined) {
      for (let i = 0; i < this.cartData.length; i++) {
        this.total += this.cartData[i].price * this.cartData[i].number;
      }
      return this.total;
    }
  }

  submitOrder() {
    this.Httpservice.submitOrderDB(JSON.stringify(this.cartData))
      .subscribe(
        (response) => {
          this.msgloader.initMsg('سفارش شما با موفقیت ثبت شد.', 'alert-success', true);
          this.cartData = [{title: '', number: 0, price: 0}];
          this.updateCartCookie();
          this.router.navigate(['/product-category/blade']);
        }
      );
  }
}
