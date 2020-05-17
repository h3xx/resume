import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';

import { QRCodeModule } from 'angularx-qrcode';
import { NgxMdModule } from 'ngx-md';

import { ResumeComponent } from './resume/resume.component';
import { ResumeNavComponent } from './resume-nav/resume-nav.component';
import { ResumeTextComponent } from './resume-text/resume-text.component';

import { HeadersService } from './headers.service';

@NgModule({
    declarations: [
        ResumeComponent,
        ResumeNavComponent,
        ResumeTextComponent,
    ],
    exports: [
        ResumeComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,

        NgxMdModule,
        QRCodeModule,
    ],
    providers: [
        HeadersService,
    ],
})
export class ResumeModule { }
