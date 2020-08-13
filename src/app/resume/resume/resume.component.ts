import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Output,
    ViewChild,
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

    @Output() private readonly printClicked = new EventEmitter<undefined>();

    private currentSection?: string;

    @ViewChild('resumeText', { read: ElementRef }) private readonly resumeText?: ElementRef<HTMLElement>;

    constructor(
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly headersService: HeadersService,
    ) {
    } // end constructor()

    public onClickPrint(): void {
        this.printClicked.emit();
        window.print();
    } // end onClickPrint()

    private onSectionChange(sectionId: string): void {
        this.headersService.currentHeaderId.next(sectionId);
    } // end onSectionChange()

    @HostListener('window:scroll', ['$event'])
    public onWindowScroll(event: Event): void {
        if (this.resumeText?.nativeElement && event.currentTarget) {
            const scrollY = (event.currentTarget as Window).scrollY;
            const parentOffset = this.elementRef.nativeElement.offsetTop;
            (this.resumeText.nativeElement.querySelectorAll('[id]') as NodeListOf<HTMLElement>).forEach(
                (elem: HTMLElement): void => {
                    if ((elem.offsetTop - parentOffset) <= scrollY) {
                        if (elem.id !== this.currentSection) {
                            this.currentSection = elem.id;
                            this.onSectionChange(this.currentSection);
                        }
                    }
                });
        }
    } // end onWindowScroll()

}
