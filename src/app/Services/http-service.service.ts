import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  get ActivateLoader(): boolean {
    return this._ActivateLoader;
  }
  set ActivateLoader(value: boolean) {
    this._ActivateLoader = value;
  }
  count: any;
  private _pnum: number;
  pageArr = [];
  pagenumber: number;
  products: any[] = [];
  posts: any[] = [];
  pernumber: any;
  category: string;
  url: string;
  type: string;
  parsedData: any;
  private _ActivateLoader: boolean;
  searchInput: string;
  hidePaginator = false;
  catTitle: string;
  get pnum(): number {
    return this._pnum;
  }
  catlist = ['blade', 'rubber', 'pingball', 'table', 'pingracket', 'badminton', 'balls', 'footbalhand', 'billiard', 'airfilter', 'flask', ];
  private arr: any[];
  constructor(private http: Http, private router: Router) {
  }
  getProductlist(pernumber: number = 12, pagenumber: number = 1, cat: string = 'blade', searchTerm?: string, postType: string = 'product') {
    if (this.catlist.indexOf(cat) === -1 && cat !== null) {
      this.router.navigate(['/not-found']);
      return;
    }
    this.url = 'http://tinysports.ir/webservice.php?cat=' + cat + '&num=' + pernumber + '&page=' + pagenumber;
    if (typeof searchTerm !== 'undefined') {
      this.url = 'http://tinysports.ir/webservice.php?search=' + searchTerm + '&num=' + pernumber + '&page=' + pagenumber;
    }
    if (postType === 'post') {
      this.url = 'http://tinysports.ir/webservice.php?post_type=post&num=' + pernumber + '&page=' + pagenumber;
    }
    return this.http.get(this.url)
      .pipe(map(
        (response: Response) => {
          const data = JSON.stringify(response);
          this.parsedData = (JSON.parse(data))._body;
          try {
            this.arr = [JSON.parse(this.parsedData), pernumber];
          }   catch (e) {
            this.arr = [this.parsedData, pernumber, '1'];
          }
          return this.arr;
        }
      ));
  }
  productsNumber(parsedData) {
    const count = parsedData.category[0].count;
    return count;
  }
  parseData(parsedData) {
    const productlist = [];
    for (let i = 0; i < parsedData.products.length; i++) {
      const product = parsedData.products[i].product;
      productlist.push(product);
    }
    return productlist;
  }
  CreateCountArr() {
    this.pageArr = [];
    this._pnum = this.count;
    this.count = this.count / this.pernumber;
    this.count.toString();
    this.count = parseInt(this.count, 10) + 1;
    let i = 0;
    while (i < this.count) {
      i++;
      this.pageArr.push(i);
    }
  }

  productDetailes(products) {
    this.products = [];
    if (products.length < 3) {
      this.count = this.productsNumber(products[0]);
      this.CreateCountArr();
      for (let i = 0; i < this.parseData(products[0]).length; i++) {
        this.products.push({
          title:
            this.parseData(products[0])[i].post_title.replace('<br>', '\n'),
          price:
          this.parseData(products[0])[i].price,
          imgurl:
          this.parseData(products[0])[i].img,
          url:
          this.parseData(products[0])[i].url,
          stock:
          this.parseData(products[0])[i].stock
        });
      }
    }
  }
  postDetailes(products) {
    this.count = this.productsNumber(products[0]);
    this.CreateCountArr();
    for (let i = 0; i < this.parseData(products[0]).length; i++) {
      this.posts.push({
        title:
          this.parseData(products[0])[i].post_title.replace('<br>', '\n'),
        imgurl:
          this.parseData(products[0])[i].img
      });
    }
  }
  scrolltoTop() {
    const elementt = document.getElementById('top');
    elementt.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }
  signup(userData) {
    this.url = 'http://tinysports.ir/webservice.php?post_type=signup';
    return this.http.post(this.url, userData)
      .pipe(map(
        (response: Response) => {
          const responsestring = JSON.stringify(response);
          const parsedResponse = JSON.parse(responsestring);
          return parsedResponse._body;
        }
      ));
  }
  signin(userData) {
    this.url = 'http://tinysports.ir/webservice.php?post_type=signin';
    return this.http.post(this.url, userData)
      .pipe(map(
        (response: Response) => {
          const responsestring = JSON.stringify(response);
          const parsedResponse = JSON.parse(responsestring);
          return parsedResponse._body;
        }
      ));
  }
  checkLoginData(userData) {
    this.url = 'http://tinysports.ir/webservice.php?post_type=login_status';
    return this.http.post(this.url, userData)
      .pipe(map(
        (response: Response) => {
          const responsestring = JSON.stringify(response);
          const parsedResponse = JSON.parse(responsestring);
          return parsedResponse._body;
        }
      ));
  }
  submitOrderDB(orderData) {
    this.url = 'http://tinysports.ir/webservice.php?post_type=order';
    return this.http.post(this.url, orderData)
      .pipe(map(
        (response: Response) => {
          const responsestring = JSON.stringify(response);
          const parsedResponse = JSON.parse(responsestring);
          return parsedResponse._body;
        }
      ));
  }
}
