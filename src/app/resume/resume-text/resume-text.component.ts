import {
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { NgxMdService } from 'ngx-md';

import { Header } from '../header.interface';
import { HeadersService } from '../headers.service';

type levelType = 1|2|3|4|5|6;
type alignType = 'left' | 'right' | 'center' | null;
interface FlagsType {
    readonly align: alignType;
    readonly header: boolean;
}

interface Slugger {
    slug(raw: string): string;
}

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-resume-text',
    styleUrls: [
        './resume-text.component.scss',
    ],
    templateUrl: './resume-text.component.html',
})
export class ResumeTextComponent {

    private readonly observedHeaders: Header[] = [];

    private readonly descriptiveMap: [RegExp, () => string ][] = [
        [
            // if > 7 years, it's pretty OP
            // (Caveat: must come before plain expert)
            new RegExp(`^\\s*\\(expert,?\\s*(?:[7-9]|[0-9][0-9])`, 'i'),
            () => this.check(4, 0.5),
        ],
        [
            new RegExp(`^\\s*\\(expert`, 'i'),
            () => this.check(4),
        ],

        [
            // if > 5 years, it's pretty advanced
            // (Caveat: must come before plain advanced)
            new RegExp(`^\\s*\\(advanced,?\\s*(?:[5-9]|[0-9][0-9])`, 'i'),
            () => this.check(3, 0.5),
        ],
        [
            new RegExp(`^\\s*\\(advanced`, 'i'),
            () => this.check(3),
        ],

        [
            new RegExp(`^\\s*\\(intermediate`, 'i'),
            () => this.check(2),
        ],
        [
            new RegExp(`^\\s*\\(beginner`, 'i'),
            () => this.check(1),
        ],
    ];

    constructor(
        private readonly headersService: HeadersService,
        private readonly mdService: NgxMdService,
    ) {
        // this.mdService.renderer.heading = (text, level: number, raw, slugger) => {
        this.mdService.renderer.heading = (text: string, level: levelType, raw: string, slugger: Slugger): string => {
            const id = `${this.headersService.headerPrefix}${slugger.slug(raw)}`;
            this.observedHeaders.push({
                id,
                text,
            });
            return this.oldHeadingCopy(text, level, id);
        };

        this.mdService.renderer.tablecell = (content: string, flags: FlagsType): string => {
            return this.replaceDescriptionWithIcon(content, flags);
        };

        this.mdService.setMarkedOptions({
            headerIds: true,
            headerPrefix: this.headersService.headerPrefix,
        });
    } // end constructor()

    private replaceDescriptionWithIcon(content: string, flags: FlagsType): string {
        let newContent = content;

        this.descriptiveMap.forEach(
            ([ re, repl ]): void => {
                if (newContent.match(re)) {
                    newContent = repl();
                    // newContent = `<span title="${newContent}">${repl()}</span>`;
                }
            }
        );

        return this.oldTableCellCopy(newContent, flags);
    } // end replaceDescriptionWithIcon()

    private oldTableCellCopy(content: string, flags: FlagsType): string {
        const type = flags.header ? 'th' : 'td';
        const tag = flags.align
            ? `<${type} align="${flags.align}">`
            : `<${type}>`;
        return `${tag}${content}</${type}>\n`;
    } // end oldTableCellCopy()

    private check(ctGreen: number, ctYellow?: number): string {
        const whole = '<i class="fa fa-check-circle mr-1"></i>';
        const plus = '<i class="fa fa-plus mr-1"></i>';
        const makeIt = (ct: number, cls: string): string => {
            let part: string = whole.repeat(ct);
            // add halves
            const lo = ct - Math.trunc(ct);
            if (lo > 0) {
                part = `${part}${plus}`;
            }
            if (cls && part) {
                part = `<span class="${cls}">${part}</span>`;
            }
            return `${part}`;
        };
        return `${
            ctGreen
                ? makeIt(
                    ctGreen,
                    'text-success',
                )
                : ''
            }${
            ctYellow
                ? makeIt(
                    ctYellow,
                    'text-warning',
                )
                : ''
            }`;
    } // end check()

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
