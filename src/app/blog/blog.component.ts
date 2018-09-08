import {Component, HostListener, OnInit} from '@angular/core';
import { HttpServiceService} from '../http-service.service';
import {Posts} from '../postlist';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: Posts[];
  private pagenumber: number;
  constructor(public Httpservice: HttpServiceService) { }
  getRequest(pagenumber) {
    this.Httpservice.ActivateLoader = true;
      this.Httpservice.getProductlist(12, pagenumber, null, null, 'post')
        .subscribe(
          (posts: any[]) => {
            this.Httpservice.postDetailes(posts); },
          null,
          () => {
            this.Httpservice.ActivateLoader = false;
            this.posts = this.Httpservice.posts;
            this.pagenumber++;
          }
        );
  }
  ngOnInit() {
    this.pagenumber = 1;
    this.getRequest(this.pagenumber);
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
// pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos === max && this.pagenumber <= (this.Httpservice.pnum / 12) )   {
      this.getRequest(this.pagenumber);
    }
  }
}
