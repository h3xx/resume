import {
    Component,
} from '@angular/core';

import { HeadersService } from '../headers.service';

@Component({
    selector: 'app-resume',
    styleUrls: [
        './resume.component.scss',
    ],
    templateUrl: './resume.component.html',
})
export class ResumeComponent {

    constructor(
        private readonly headersService: HeadersService,
    ) {
    } // end constructor()

    public onSectionChange(sectionId: string) {
        this.headersService.currentHeaderId.next(sectionId);
    } // end onSectionChange()

}
