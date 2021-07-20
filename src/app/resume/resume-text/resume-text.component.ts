import {
    Component,
    ViewEncapsulation,
    OnDestroy,
} from '@angular/core';
import { NgxMdService } from 'ngx-md';
import {
    BehaviorSubject,
    Subscription,
} from 'rxjs';

import { Header } from '../header.interface';
import { HeadersService } from '../headers.service';
import { SkillsGraphDataService } from '../skills-graph-data.service';
import { Skill } from '../skill.interface';

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
export class ResumeTextComponent implements OnDestroy {

    private readonly _subscriptions: Subscription[] = [];

    public readonly skillsGraphID = 'skills-chart';
    private readonly skillData: Skill[] = [];

    private readonly observedHeaders: Header[] = [];

    private readonly descriptiveMap: [RegExp, () => string ][] = [
        /*
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
        */
    ];

    constructor(
        private readonly headersService: HeadersService,
        private readonly mdService: NgxMdService,
        private readonly skillsGraphDataService: SkillsGraphDataService,
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

        // Collect data for skills graph
        const tableCellObserver = new BehaviorSubject<[string, FlagsType] | undefined>(undefined);
        let headerCount = 0;
        let cellColumn = 0;
        let row = 0;
        let inTableBody = false;
        let stopProcessing = false;
        let skillName: string;
        this._subscriptions.push(
            tableCellObserver.subscribe(
                (val: [string, FlagsType] | undefined): void => {
                    if (stopProcessing || typeof val === 'undefined') {
                        return;
                    }
                    const [contents, flags] = val;
                    if (inTableBody && flags.header) {
                        // Another table starting - we don't want that
                        stopProcessing = true;
                        return;
                    }
                    if (flags.header) {
                        ++headerCount;
                    } else {
                        inTableBody = true;
                        if (headerCount != 2) {
                            console.error(`Table format didn't fall within our expectations`);
                            stopProcessing = true;
                            return;
                        }
                        switch (cellColumn) {
                            case 0:
                                skillName = contents;
                                break;
                            case 1:
                                if (skillName) {
                                    this.skillData.push({
                                        name: skillName,
                                        desc: contents,
                                    });
                                    skillName = undefined;
                                }
                                break;
                        }
                        cellColumn = (cellColumn + 1) % headerCount;
                        if (cellColumn === 0) {
                            ++row;
                        }
                    }
                },
            ),
        );

        this.mdService.renderer.tablecell = (content: string, flags: FlagsType): string => {
            tableCellObserver.next([ content, flags ]);
            return this._oldTableCellCopy(content, flags);
        };
        this.mdService.renderer.table = (header: string, body: string): string => {
            return this.replaceTableWithSkillsGraph(header, body);
        };

        this.mdService.setMarkedOptions({
            headerIds: true,
            headerPrefix: this.headersService.headerPrefix,
        });
    } // end constructor()

    private collectSkillsGraphData(content: string, flags: FlagsType): void {
        if (!flags.header) {
        }
        console.log(content);
    } // end collectSkillsGraphData()

    private replaceTableWithSkillsGraph(header: string, body: string): string {
        return `<div id="${this.skillsGraphID}"></div>`;
    } // end replaceTableWithSkillsGraph()

    private _replaceDescriptionWithIcon(content: string, flags: FlagsType): string {
        let newContent = content;

        this.descriptiveMap.forEach(
            ([ re, repl ]): void => {
                if (newContent.match(re)) {
                    newContent = repl();
                    // newContent = `<span title="${newContent}">${repl()}</span>`;
                }
            }
        );

        return this._oldTableCellCopy(newContent, flags);
    } // end _replaceDescriptionWithIcon()

    /**
     * This method was copied from the ngx-md code to preserve original table
     * rendering functionality.
     */
    private _oldTableCellCopy(content: string, flags: FlagsType): string {
        const type = flags.header ? 'th' : 'td';
        const tag = flags.align
            ? `<${type} align="${flags.align}">`
            : `<${type}>`;
        return `${tag}${content}</${type}>\n`;
    } // end _oldTableCellCopy()

    private _check(ctGreen: number, ctYellow?: number): string {
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
    } // end _check()

    private oldHeadingCopy(text: string, level: levelType, id: string): string {
        return `<h${level} id="${id}">${text}</h${level}>\n`;
    } // end oldHeadingCopy()

    public onMarkdownLoad(): void {
        // For some reason, marked keeps sending us headers after rendering,
        // making it show up twice when rendering the nav.
        // Solution: send the BS a COPY
        if (this.observedHeaders) {
            this.headersService.headers.next([...this.observedHeaders]);
            this.skillsGraphDataService.renderGraph(
                `#${this.skillsGraphID}`,
                this.skillData,
            );
        }
    } // end onMarkdownLoad()

    public ngOnDestroy(): void {
        this._subscriptions.forEach(
            (s: Subscription) => {
                s.unsubscribe();
            }
        );
    } // end ngOnDestroy()

}
