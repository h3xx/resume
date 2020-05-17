import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ResumeModule } from './resume/resume.module';

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        ResumeModule,
    ],
    providers: [
    ],
})
export class AppModule { }
