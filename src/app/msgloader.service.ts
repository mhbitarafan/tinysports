import {
  Injectable
} from '@angular/core';


@Injectable()
export class MsgloaderService {
  showMsg = false;
  get msgtype(): string {
    return this._msgtype;
  }
  private _msgtype: string;
  get msgtxt(): string {
    return this._msgtxt;
  }
  private _msgtxt: string;
  constructor() {
  }
  initMsg(body: string, msgtype: string) {
    this._msgtxt = body;
    this._msgtype = msgtype;
  }
  autoHide() {
    window.setTimeout(() => { this.showMsg = false; }, 4000);
  }
}
