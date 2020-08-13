import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/****************************************
 * Components
 */

import { ClippyComponent } from './clippy/clippy.component';
import { TipBalloonComponent } from './tip-balloon/tip-balloon.component';

@NgModule({
    declarations: [
        ClippyComponent,
        TipBalloonComponent,
    ],
    exports: [
        ClippyComponent,
        TipBalloonComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class ClippyModule { }
