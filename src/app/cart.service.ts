import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartData = [];
  private found: boolean;
  num = 1;
  private total: number;
  addtocart(productTitle, price, number?) {
    this.found = false;
    for (let i = 0; i < this.cartData.length; i++) {
      if (this.cartData[i].title === productTitle) {
        this.found = true;
        this.cartData[i].number++;
        return;
      }
    }
    this.cartData.push({title: productTitle, price: price, number: this.num});
  }
  calcTotal() {
    this.total = 0;
    for (let i = 0; i < this.cartData.length; i++) {
      this.total += this.cartData[i].price * this.cartData[i].number;
    }
    return this.total;
  }
  constructor() { }
}
