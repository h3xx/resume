import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ResumeModule } from './resume/resume.module';

import { ForkmeComponent } from './forkme/forkme.component';

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    declarations: [
        AppComponent,
        ForkmeComponent,
    ],
    imports: [
        BrowserModule,
        ResumeModule,
    ],
    providers: [
    ],
})
export class AppModule { }
