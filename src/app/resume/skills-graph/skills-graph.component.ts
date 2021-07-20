import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewEncapsulation,
    AfterViewInit,
} from '@angular/core';
import {
    Subscription,
    timer,
} from 'rxjs';

import { SkillsGraphDataService } from '../skills-graph-data.service';

import * as c3 from 'c3';

@Component({
    selector: 'app-skills-graph',
    templateUrl: './skills-graph.component.html',
    styleUrls: [
        './skills-graph.component.scss',
    ],
})
export class SkillsGraphComponent implements AfterViewInit, OnDestroy {

    /*
    private readonly _subscriptions: Subscription[] = [];

    @Input() private readonly chartSelector?: string;

    private data?: c3.Data;

    constructor(
        private readonly skillsGraphDataService: SkillsGraphDataService,
    ) {
        this._subscriptions.push(
            this.skillsGraphDataService.skillsData
                .subscribe((data?: c3.Data): void => {
                    this.data = data;
                }),
            this.skillsGraphDataService.triggerRender
                .subscribe((): void => {
                    this.createChart();
                }),
        );

            // FIXME - debugging
            this.skillsGraphDataService.skillsData.next({
                        columns: [
                            ['data1', 30, 200, 100, 400, 150, 250],
                            ['data2', 50, 20, 10, 40, 15, 25],
                        ]
                    });
    } // end constructor()

    private createChart(): void {
        console.log(this.chartSelector);
        if (this.chartSelector && this.data) {
           // this.skillsGraphDataService.renderGraph(
           //     {
           //         columns: [
           //             ['data1', 30, 200, 100, 400, 150, 250],
           //             ['data2', 50, 20, 10, 40, 15, 25],
           //         ]
           //     }
           //     );
           //
            const chart = c3.generate({
                bindto: this.chartSelector,
                data: this.data,
                // {
                //     columns: [
                //         ['data1', 30, 200, 100, 400, 150, 250],
                //         ['data2', 50, 20, 10, 40, 15, 25],
                //     ]
                // }
            });
            debugger;
        }
    } // end createChart()

    public ngAfterViewInit(): void {
        // this.createChart();
    } // end ngAfterViewInit()

    public ngOnDestroy(): void {
        this._subscriptions.forEach(
            (s: Subscription) => {
                s.unsubscribe();
            }
        );
    } // end ngOnDestroy()

   */
}
