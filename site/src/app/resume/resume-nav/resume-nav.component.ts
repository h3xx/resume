import {
    Component,
    OnDestroy,
    OnInit,
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
export class ResumeNavComponent implements OnDestroy, OnInit {

    private readonly _subscriptions: Subscription[] = [];
    public headers?: Header[];
    public activeNavId?: string;

    constructor(
        private readonly headersService: HeadersService,
    ) {
        this._subscriptions.push(
            this.headersService.headers.subscribe(
                (val: Header[] | undefined): void => {
                    this.headers = val;
                }
            ),
        );
    } // end constructor()

    public ngOnDestroy(): void {
        this._subscriptions.forEach(
            (s: Subscription) => {
                s.unsubscribe();
            }
        );
    } // end ngOnDestroy()

    public ngOnInit(): void {
        window.addEventListener('scroll', () => {
            if (this.headers) {
                this.headers.forEach(
                    (hdr: Header): void => {
                        const hElement: HTMLElement | null = document.querySelector(`#${hdr.id}`) as HTMLElement;
                        if (hElement) {
                            if (
                                hElement.offsetTop <= window.scrollY &&
                                hElement.offsetTop + hElement.offsetHeight > window.scrollY
                            ) {
                                this.activeNavId = hdr.id;
                            }
                        }
                    }
                );
            }
        });
    }

}
