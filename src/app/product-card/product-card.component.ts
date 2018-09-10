import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../http-service.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { MsgloaderService} from '../msgloader.service';
import { CartService } from '../cart.service';
import { CookieService } from 'ngx-cookie-service';
import {GeneralService} from '../general.service';


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
  categorylist = [
    {title: 'پینگ پنگ', link: 'pingpong'},
    {title: 'بدمینتون', link: 'badminton'},
    {title: 'توپ ها', link: 'balls'},
    {title: 'فوتبال دستی' , link: 'footbalhand'},
    {title: 'بیلیارد و ایرهاکی', link: 'billiard'},
    {title: 'دستگاه تصفیه هوا', link: 'airfilter'},
    {title: 'قمقمه', link: 'flask'}
  ];
  subcategoryping = [
    {title: 'چوب پینگ پنگ', link: 'blade'},
    {title: 'رویه پینگ پنگ', link: 'rubber'},
    {title: 'میز پینگ پنگ', link: 'table'},
    {title: 'توپ پینگ پنگ' , link: 'pingball'},
    {title: 'راکت آماده پینگ پنگ', link: 'pingracket'}
  ];
  cat1: string;
  catTitle2: string;
  private catTitle3: string;
  constructor(public Httpservice: HttpServiceService, private route: ActivatedRoute, public msgloader: MsgloaderService, private router: Router, public cartservice: CartService, private cookieService: CookieService, public general: GeneralService) {
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
            if (products.length > 2) {
              this.pagebroad = 0;
              this.msgloader.showMsg = true;
              this.msgloader.initMsg(products[0], 'alert-danger');
              this.Httpservice.hidePaginator = true;
            } else {
              this.Httpservice.hidePaginator = false;
              this.cat1 = '';
              this.Httpservice.productDetailes(products);
              this.Httpservice.ActivateLoader = true;
              if (this.Httpservice.pnum / this.Httpservice.pernumber <= 1) {
                this.pagebroad = 0;
              }
            }
            },
          (error) => {
            this.msgloader.showMsg = true;
            this.msgloader.initMsg(error.statusText, 'alert-danger');
            if (error.status === 0) {
              this.msgloader.initMsg('ارتباط شما با اینترنت برقرار نمی باشد.', 'alert-danger');
            }
            this.Httpservice.ActivateLoader = false; },
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
            this.catTitle = this.catTitle3;
            this.Httpservice.productDetailes(products);
            this.Httpservice.ActivateLoader = true;
            if (this.Httpservice.pnum / this.Httpservice.pernumber <= 1) {
              this.pagebroad = 0;
            }
            this.cat1 = '';
            for (let i = 0; i < this.categorylist.length; i++) {
              if (this.catTitle2 === this.categorylist[i].link) {
                this.catTitle = this.categorylist[i].title;
                break;
              }          else {
                for (let j = 0; j < this.subcategoryping.length; j++) {
                  if (this.catTitle2 === this.subcategoryping[j].link) {
                    this.cat1 = 'پینگ پنگ';
                    this.catTitle = this.subcategoryping[j].title;
                    break;
                  }
                }
              }
            }
            },
          (error) => {
            this.pagebroad = 0;
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
    this.catTitle = '';
    this.pagebroad = 0;
    this.cat1 = '';
    this.Httpservice.pagenumber = this.route.snapshot.params['page'];
    this.Httpservice.category = this.route.snapshot.params['category'];
    this.Httpservice.searchInput = this.route.snapshot.params['searchterm'];
    this.route.params.
    subscribe(
      (params: Params) => {
        this.Httpservice.ActivateLoader = true;
        this.Httpservice.pagenumber = params['page'];
        this.catTitle3 = this.catTitle;
        this.catTitle2 = params['category'];
        if (typeof this.catTitle2 === 'undefined') {
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
      },
      null,
      () => {
      }
    );
  }
}
