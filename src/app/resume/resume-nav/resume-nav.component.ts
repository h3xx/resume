import {
    Component,
    OnDestroy,
} from '@angular/core';
import {
    Subscription,
} from 'rxjs';

import { Header } from '../header.interface';
import { HeadersService } from '../headers.service';

@Component({
    selector: 'app-resume-nav',
    styleUrls: [
        './resume-nav.component.scss',
    ],
    templateUrl: './resume-nav.component.html',
})
export class ResumeNavComponent implements OnDestroy {

    public firstHdr?: Header;
    public headers?: Header[];
    public activeNavId?: string;

    private readonly subs: Subscription[] = [];

    constructor(
        private readonly headersService: HeadersService,
    ) {
        this.subs.push(
            this.headersService.headers.subscribe(
                (val: Header[] | undefined): void => {
                    if (Array.isArray(val)) {
                        this.firstHdr = val.shift();
                        this.headers = val;
                    }
                }
            ),
            this.headersService.currentHeaderId.subscribe(
                (val: string | undefined): void => {
                    this.activeNavId = val;
                }
            ),
        );
    } // end constructor()

    public ngOnDestroy(): void {
        this.subs.forEach(
            (s: Subscription) => {
                s.unsubscribe();
            }
        );
    } // end ngOnDestroy()

}
