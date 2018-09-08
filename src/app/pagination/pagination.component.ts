import {Component, HostListener, OnInit} from '@angular/core';
import {HttpServiceService} from '../http-service.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatPaginatorIntl , PageEvent} from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  length = 12;
  pageSize = 12;
  pageIndex: number;
  pageSizeOptions: number[] = [12, 24, 36, 48];
  pageEvent: PageEvent;
  cookieValue: string;
  date: Date;
  type: any;

  constructor(public Httpservice: HttpServiceService, private route: ActivatedRoute, public router: Router, private  paginator: MatPaginatorIntl, private cookieService: CookieService) {
    const cookieValue = cookieService.get('perPage');
    if (cookieValue) { this.pageSize = Number(cookieValue); }
    Httpservice.pernumber = this.pageSize;
  }
  getRequest(pagenumber) {
    this.Httpservice.pernumber = this.pageSize;
    if (this.route.snapshot.url[0].path === 'search') {
      this.Httpservice.getProductlist(this.Httpservice.pernumber, pagenumber, null, this.Httpservice.searchInput)
        .subscribe(
          (products: any[]) => {
            this.Httpservice.scrolltoTop();
            this.Httpservice.productDetailes(products);
            this.Httpservice.ActivateLoader = true;
          },
          (error) => {},
          () => {
            this.Httpservice.category = this.Httpservice.searchInput;
            if (typeof  this.Httpservice.pagenumber === 'undefined') {
              pagenumber = 1;
            }
            this.Httpservice.ActivateLoader = false;
          }
        );
    } else {
      this.Httpservice.type = 'product-category';
      this.Httpservice.getProductlist(this.Httpservice.pernumber, pagenumber, this.Httpservice.category)
        .subscribe(
          (products: any[]) => {
            this.Httpservice.productDetailes(products);
            this.Httpservice.ActivateLoader = true;
          },
          (error) => {},
          () => {
            this.Httpservice.ActivateLoader = false; this.Httpservice.scrolltoTop();
             }
        );
    }
  }
  handlePage(e: any) {
    this.Httpservice.pagenumber = e.pageIndex + 1;
    this.Httpservice.pernumber = e.pageSize;
    if (this.pageSize !== e.pageSize) {
      this.pageSize = e.pageSize;
      this.cookieValue = this.cookieService.get('perPage');
      if (this.cookieValue !== this.pageSize.toString() || typeof this.cookieValue === 'undefined') {
        this.date = new Date();
        this.cookieService.set( 'perPage', this.pageSize.toString() , this.date.getTime() + (100 * 24 * 60 * 60 * 1000) , '/' );
      }
      this.getRequest(this.Httpservice.pagenumber);
    }
    this.router.navigate([this.Httpservice.type + '/' + this.Httpservice.category + '/' + this.Httpservice.pagenumber]);
    return e;
  }
  ngOnInit() {
    this.paginator.itemsPerPageLabel = 'تعداد محصول در هر صفحه';
    this.Httpservice.pagenumber = this.route.snapshot.params['page'];
    this.pageIndex = this.Httpservice.pagenumber;
    this.cookieValue = this.cookieService.get('perPage');
    if (this.cookieValue !== this.pageSize.toString() || typeof this.cookieValue === 'undefined') {
      this.date = new Date();
      this.cookieService.set( 'perPage', this.pageSize.toString() , this.date.getTime() + (100 * 24 * 60 * 60 * 1000) , '/' );
    }
  }
}
