import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// *******************************************************************************
// Libs

import { NgxMdModule } from 'ngx-md';

// *******************************************************************************
// App Components

import { ForkmeComponent } from './forkme/forkme.component';
import { ResumeNavComponent } from './resume-nav/resume-nav.component';
import { ResumeTextComponent } from './resume-text/resume-text.component';
import { ResumeComponent } from './resume/resume.component';

// *******************************************************************************
// Services

import { HeadersService } from './headers.service';

@NgModule({
    declarations: [
        ForkmeComponent,
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
    ],
    providers: [
        HeadersService,
    ],
})
export class ResumeModule { }
