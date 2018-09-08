import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../http-service.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { MsgloaderService} from '../msgloader.service';
import { CartService } from '../cart.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  catTitle: string;
  pagebroad: number;
  added: string;
  private date: Date;
  constructor(public Httpservice: HttpServiceService, private route: ActivatedRoute, public msgloader: MsgloaderService, private router: Router, public cartservice: CartService, private cookieService: CookieService) {
    this.Httpservice.ActivateLoader = true;
  }
  addtocart(productName, price) {
    this.msgloader.showMsg = true;
    this.added = productName;
    this.msgloader.initMsg('به سبد خرید افزوده شد.', 'alert-success');
    this.msgloader.autoHide();
    this.cartservice.addtocart(productName, price);
    this.date = new Date();
    this.cookieService.set( 'cartData', JSON.stringify(this.cartservice.cartData) , this.date.getTime() + (100 * 24 * 60 * 60 * 1000) , '/' );
  }
  getRequest(pagenumber) {
    this.Httpservice.products = [];
    this.Httpservice.scrolltoTop();
    if (this.route.snapshot.url[0].path === 'search') {
      this.Httpservice.type = 'search';
      this.Httpservice.category = this.Httpservice.searchInput;
      this.Httpservice.getProductlist(this.Httpservice.pernumber, pagenumber, 'blade', this.Httpservice.searchInput)
        .subscribe(
          (products: any[]) => {
            this.Httpservice.productDetailes(products);
            this.Httpservice.ActivateLoader = true; },
          null,
          () => {
            this.Httpservice.ActivateLoader = false;
            if (typeof  this.Httpservice.pagenumber === 'undefined') {
              pagenumber = 1;
            }
          }
        );
    }    else {
      this.Httpservice.type = 'product-category';
      this.Httpservice.getProductlist(this.Httpservice.pernumber, this.Httpservice.pagenumber, this.Httpservice.category)
        .subscribe(
          (products: any[]) => {
            this.Httpservice.productDetailes(products);
            this.Httpservice.ActivateLoader = true; },
          (error) => {
            this.msgloader.showMsg = true;
            this.msgloader.initMsg(error.statusText, 'alert-danger');
            if (error.status === 0) {
              this.msgloader.initMsg('ارتباط شما با اینترنت برقرار نمی باشد.', 'alert-danger');
            }
            this.Httpservice.ActivateLoader = false; },
          () => {
            this.Httpservice.ActivateLoader = false; }
        );
    }
  }
  ngOnInit() {
    this.Httpservice.pagenumber = this.route.snapshot.params['page'];
    this.Httpservice.category = this.route.snapshot.params['category'];
    this.Httpservice.searchInput = this.route.snapshot.params['searchterm'];
    this.route.params.
    subscribe(
      (params: Params) => {
        this.msgloader.showMsg = false;
        this.Httpservice.ActivateLoader = true;
        this.Httpservice.pagenumber = params['page'];
        this.catTitle = params['category'];
        if (typeof this.catTitle === 'undefined') {
          this.catTitle = 'جستجو برای: ' + params['searchterm'];
        }
        this.pagebroad = this.Httpservice.pagenumber;
        if (typeof this.pagebroad === 'undefined') {
          this.pagebroad = 1;
        }
        if (typeof this.Httpservice.pagenumber === 'undefined') {
          this.Httpservice.pagenumber  = 1;
        }
        this.Httpservice.category = this.route.snapshot.params['category'];
        this.getRequest(this.Httpservice.pagenumber);
      }
    );
  }
}
