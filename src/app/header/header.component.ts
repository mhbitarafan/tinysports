import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../http-service.service';
import {Router} from '@angular/router';
import {MsgloaderService} from '../msgloader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public Httpservice: HttpServiceService, private router: Router, public msgloader: MsgloaderService) { }
  getRequest(pagenumber) {
    this.Httpservice.products = [];
    this.Httpservice.getProductlist(12, 1, null, this.Httpservice.searchInput)
      .subscribe(
        (products: any[]) => {
          this.Httpservice.productDetailes(products);
          this.Httpservice.ActivateLoader = true; },
        (error) => {console.log(error); },
        () => {
          this.Httpservice.ActivateLoader = false;
          this.router.navigate(['search/' + this.Httpservice.searchInput]);
          if (this.Httpservice.products.length === 0) {
            this.msgloader.showMsg = true;
            this.msgloader.initMsg('نتیجه ای برای عبارت مورد نظر شما یافت نشد. برای نتیجه بهتر از کلمات کلیدی استفاده کنید.', 'alert-danger');
          }
        }
      );
  }
  search(inputlength?: number) {
    if (inputlength > 2 && typeof inputlength !== 'undefined') {
      this.getRequest(1);
    }
  }
  ngOnInit() {
  }

}
