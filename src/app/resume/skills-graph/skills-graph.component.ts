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

    private _chartSelector?: string;
    @Input() private set chartSelector(val: string) {
        this._chartSelector = val;
        this.createChart();
    } // end set chartSelector()

    private _data?: c3.Data;
    @Input() private set data(val: c3.Data) {
        this._data = val;
        this.createChart();
    } // end set data()

    constructor() {
    } // end constructor()

    private createChart(): void {
        if (this._chartSelector && this._data) {
            const chart = c3.generate({
                bindto: this._chartSelector,
                data: this._data,
                // {
                //     columns: [
                //         ['data1', 30, 200, 100, 400, 150, 250],
                //         ['data2', 50, 20, 10, 40, 15, 25],
                //     ]
                // }
            });
        }
    } // end createChart()

    public ngAfterViewInit(): void {
    } // end ngAfterViewInit()

}
