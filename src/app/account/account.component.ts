import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isClosed: boolean;
  Closemodal() {
    this.isClosed = true;
  }
  constructor() {
    this.isClosed = false;
  }

  ngOnInit() {
  }

}
