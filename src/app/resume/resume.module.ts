import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// *******************************************************************************
// Libs

import { QRCodeModule } from 'angularx-qrcode';
import { NgxMdModule } from 'ngx-md';

// *******************************************************************************
// App Components

import { ResumeNavComponent } from './resume-nav/resume-nav.component';
import { ResumeTextComponent } from './resume-text/resume-text.component';
import { ResumeComponent } from './resume/resume.component';

// *******************************************************************************
// Services

import { HeadersService } from './headers.service';

// *******************************************************************************
// Directives

import { ScrollSpyDirective } from './scroll-spy.directive';

@NgModule({
    declarations: [
        ResumeComponent,
        ResumeNavComponent,
        ResumeTextComponent,
        ScrollSpyDirective,
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
