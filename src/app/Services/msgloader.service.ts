import {
  Injectable
} from '@angular/core';

@Injectable()
export class MsgloaderService {
  showMsg = false;
  public msgtype: string;
  public msgtxt: string;
  private timeouthandle: number;

  constructor() {
  }

  initMsg(msgText: string, msgType: string, autoHide: boolean, autoHideTimeout: number = 4000) {
    if (this.timeouthandle) { window.clearTimeout(this.timeouthandle); }
    this.showMsg = true;
    this.msgtxt = msgText;
    this.msgtype = msgType;
    if (autoHide) {
      this.timeouthandle = window.setTimeout(() => {
        this.showMsg = false;
      }, autoHideTimeout);
    }
  }
}
