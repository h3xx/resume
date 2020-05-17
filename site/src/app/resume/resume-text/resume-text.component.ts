import {
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { NgxMdService } from 'ngx-md';

import { Header } from '../header.interface';
import { HeadersService } from '../headers.service';

type levelType = 1|2|3|4|5|6;

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-resume-text',
    styleUrls: [
        './resume-text.component.scss',
    ],
    templateUrl: './resume-text.component.html',
})
export class ResumeTextComponent {

    private observedHeaders: Header[] = [];

    public readonly qrcodeUrl = 'https://h3xx.github.io/resume';
    public readonly qrcodeCaption = 'h3xx.github.io/resume';

    constructor(
        private readonly headersService: HeadersService,
        private readonly mdService: NgxMdService,
    ) {
        // this.mdService.renderer.heading = (text, level: number, raw, slugger) => {
        this.mdService.renderer.heading = (text: string, level: levelType, raw: string, slugger: any): string => {
            const id: string = `${this.headersService.headerPrefix}${slugger.slug(raw)}`;
            this.observedHeaders.push({
                id,
                text,
            });
            return this.oldHeadingCopy(text, level, id);
        }

        this.mdService.setMarkedOptions({
            headerIds: true,
            headerPrefix: this.headersService.headerPrefix,
        });
    } // end constructor()

    private oldHeadingCopy(text: string, level: levelType, id: string): string {
        return `<h${level} id="${id}">${text}</h${level}>\n`;
    } // end oldHeadingCopy()

    public onMarkdownLoad(): void {
        // For some reason, marked keeps sending us headers after rendering,
        // making it show up twice when rendering the nav.
        // Solution: send the BS a COPY
        if (this.observedHeaders) {
            this.headersService.headers.next([...this.observedHeaders]);
        }
    } // end onMarkdownLoad()

}
