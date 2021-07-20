import {
    Injectable,
} from '@angular/core';
import {
    timer,
} from 'rxjs';

import * as c3 from 'c3';

@Injectable()
export class SkillsGraphDataService {

    constructor() {
    } // end constructor()

    private _renderGraphReal(chartSelector: string, data: c3.Data): void {
        if (!document.querySelector(chartSelector)) {
            throw 'renderGraph called too early!';
        }
        const chart = c3.generate({
            bindto: chartSelector,
			data,
        });
    } // end _renderGraphReal()

    /**
     * This is a workaround for a race condition when using ngx-md to load
     * markdown from a URL; There's no way to trigger something after the
     * markdown is rendered.
     * See https://github.com/dimpu/ngx-md/issues/210
     */
    public renderGraph(chartSelector: string, data: c3.Data): void {
        const elementNotRendered = (): boolean => {
            return !document.querySelector(chartSelector);
        };
        if (elementNotRendered()) {
            console.error('renderGraph called too early! Waiting to render graph...');
            const sub = timer(100, 1000)
                .subscribe((ms: number): void => {
                    if (elementNotRendered()) {
                        console.error(`renderGraph still waiting to render graph after ${ms}ms...`);
                    } else {
                        console.log('rendering graph');
                        this._renderGraphReal(chartSelector, data);
                        sub.unsubscribe();
                    }
                });
        } else {
            this._renderGraphReal(chartSelector, data);
        }
    } // end renderGraph()

}
