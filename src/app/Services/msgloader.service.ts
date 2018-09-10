import {
  Injectable
} from '@angular/core';

@Injectable()
export class MsgloaderService {
  showMsg = false;
  private msgtype: string;
  public msgtxt: string;

  constructor() {
  }

  initMsg(msgText: string, msgType: string, autoHide: boolean, autoHideTimeout: number = 4000) {
    this.showMsg = true;
    this.msgtxt = msgText;
    this.msgtype = msgType;
    if (autoHide) {
      window.setTimeout(() => {
        this.showMsg = false;
      }, autoHideTimeout);
    }
  }
}
