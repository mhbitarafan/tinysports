import {Component, OnInit} from '@angular/core';
import { MsgloaderService} from '../../Services/msgloader.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    constructor(public msgloader: MsgloaderService) {  }
  ngOnInit() {
  }
}
