import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewChild,
    ViewEncapsulation,
    AfterViewInit,
} from '@angular/core';

import * as c3 from 'c3';

@Component({
    selector: 'app-skills-graph',
    templateUrl: './skills-graph.component.html',
    styleUrls: [
        './skills-graph.component.scss',
    ],
})
export class SkillsGraphComponent implements AfterViewInit {

    constructor() {
    } // end constructor()

    public ngAfterViewInit(): void {
        const chart = c3.generate({
            bindto: 'skills-graph',
            data: {
                columns: [
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 50, 20, 10, 40, 15, 25],
                ]
            }
        });
    } // end ngAfterViewInit()

}
