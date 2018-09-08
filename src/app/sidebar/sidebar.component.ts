import { Component, OnInit } from '@angular/core';
import { HttpServiceService} from '../http-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
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
  pageTitle: string;
  constructor(private Httpservice: HttpServiceService, private route: ActivatedRoute) {

  }

  ngOnInit() {
  }

}
