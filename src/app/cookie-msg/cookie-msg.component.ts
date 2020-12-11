import {
    Component,
    HostBinding,
    OnInit,
} from '@angular/core';

@Component({
  selector: 'app-cookie-msg',
  styleUrls: [
      './cookie-msg.component.scss',
  ],
  templateUrl: './cookie-msg.component.html',
})
export class CookieMsgComponent implements OnInit {

    private readonly showDelay = 5000;
    private readonly hideDelay = 1000;

    @HostBinding('class.show') public _show = false;
    @HostBinding('class.d-none') public _hide = false;
    @HostBinding('class.text-xs') public readonly _textXs = true;
    @HostBinding('class.fade') public readonly _fade = true;

    public ngOnInit(): void {
        window.setTimeout(
            (): void => {
                this._show = true;
            },
            this.showDelay,
        );
    } // end ngOnInit()

    public onClickDismiss(): void {
        window.setTimeout(
            (): void => {
                this._hide = true;
            },
            this.hideDelay,
        );
        this._show = false;
    } // end onClickDismiss()

}
