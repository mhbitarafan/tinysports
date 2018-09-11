import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {
  catbtntemplate = 'btn-secondary';
  catcolClasses = 'col-md-12 p-0 dropdown';
  dropdownmenuclasses = 'dropdown-menu dropdown-menu-cat text-right w-100';
  categorylist = [
    {title: 'پینگ پنگ', link: 'blade'},
    {title: 'بدمینتون', link: 'badminton'},
    {title: 'توپ ها', link: 'balls'},
    {title: 'فوتبال دستی' , link: 'footbalhand'},
    {title: 'بیلیارد و ایرهاکی', link: 'billiard'},
    {title: 'دستگاه تصفیه هوا', link: 'airfilter'},
    {title: 'قمقمه', link: 'flask'},
  ];
  ishomepage = true;
  constructor() { }

  ngOnInit() {
  }

}
