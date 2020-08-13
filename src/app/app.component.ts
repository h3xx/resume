import {
    Component,
    TemplateRef,
    ViewChild,
} from '@angular/core';

import { ClippyComponent } from './clippy/clippy/clippy.component';

interface AnnoyingMsg {
    readonly text: string;
    readonly playLimit?: number;
    readonly animation?: string;
    played?: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {

    public showingClippy = false;
    public clippySays = 'Hire this guy, okay?';

    private readonly _clippyMessages: AnnoyingMsg[] = [
        {
            animation: 'GetAttention',
            playLimit: 3,
            text: 'Hire this guy, okay?',
        },
        {
            animation: 'GestureRight',
            playLimit: 1,
            text: 'You can print this document using the PDF button on the left.',
        },
        {
            animation: 'GetAttention',
            playLimit: 1,
            text: 'This site was implemented in Angular by the person whose resume you\'re looking at.',
        },
    ];

    @ViewChild('clippy') private readonly clippy?: ClippyComponent;
    @ViewChild('dlg') private readonly dlg?: TemplateRef<{}>;
    public dialogContent?: TemplateRef<{}>;

    constructor() {
        window.setTimeout(
            (): void => {
                this.showingClippy = true;
                this.scheduleNextMsg();
            }, 60000
        );
    } // end constructor()

    private scheduleNextMsg(): void {
        const nextMsg = this._clippyMessages.shift();
        if (undefined !== nextMsg) {
            if (
                typeof nextMsg.playLimit === 'undefined'
                || nextMsg.playLimit < (nextMsg.played || 0)
            ) {
                this._clippyMessages.push(nextMsg);
            } else {
                console.log('retiring message', nextMsg);
            }
            this.scheduleMsg(nextMsg);
        }
    } // end scheduleNextMsg()

    private scheduleMsg(msg: AnnoyingMsg): void {
        window.setTimeout(
            (): void => {
                if (this.clippy) {
                    this.clippySays = msg.text;
                    this.dialogContent = this.dlg;
                    if (msg.animation) {
                        this.clippy.queueAnimation(msg.animation);
                    }
                    msg.played = (msg.played || 0) + 1;
                }
            }, 30000
        );
    } // end scheduleMsg()

    public onClippyFinished(): void {
        // this.dialogContent = this.dlg;
    } // end onClippyFinished()

    public onClippyOk(): void {
        this.dialogContent = undefined;
        this.scheduleNextMsg();
    } // end onClippyOk()

    public onClippyDismiss(): void {
        // :'-(
        this.showingClippy = false;
    } // end onClippyDismiss()

    public onPrintClicked(): void {
        this.clippy?.queueAnimation('Print');
    } // end onPrintClicked()

}
