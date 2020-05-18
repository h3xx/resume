import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Output,
} from '@angular/core';

@Directive({
    selector: '[scrollSpy]'
})
export class ScrollSpyDirective {
    @Output() public readonly sectionChange = new EventEmitter<string>();
    private currentSection?: string;

    constructor(
        private readonly _el: ElementRef
    ) {
    } // end constructor()

    @HostListener('scroll', ['$event'])
    public onScroll(event: any): void {
        if (this._el) {
            const scrollTop = event.target.scrollTop;
            const parentOffset = event.target.offsetTop;
            (this._el.nativeElement.querySelectorAll('[id]') as NodeListOf<HTMLElement>).forEach(
                (elem: HTMLElement): void => {
                    if ((elem.offsetTop - parentOffset) <= scrollTop) {
                        if (elem.id !== this.currentSection) {
                            this.currentSection = elem.id;
                            this.sectionChange.emit(this.currentSection);
                        }
                    }
                });
        }
    } // end onScroll()

}
