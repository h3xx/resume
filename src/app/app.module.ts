import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClippyModule } from './clippy/clippy.module';
import { CookieMsgComponent } from './cookie-msg/cookie-msg.component';
import { ResumeModule } from './resume/resume.module';

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    declarations: [
        AppComponent,
        CookieMsgComponent,
    ],
    imports: [
        BrowserModule,
        ClippyModule,
        DragDropModule,
        ResumeModule,
    ],
    providers: [
    ],
})
export class AppModule { }
