import {
    Component,
    HostBinding,
    Input,
    OnChanges,
} from '@angular/core';

@Component({
    selector: 'app-forkme',
    styleUrls: [
        './forkme.component.scss',
    ],
    templateUrl: './forkme.component.html',
})
export class ForkmeComponent implements OnChanges {

    @Input() public readonly url?: string;
    @Input() public readonly alignment: 'right' | 'left' = 'left';

    @HostBinding('class.right') public classRight = false;
    @HostBinding('class.left') public classLeft = false;

    public ngOnChanges(): void {
        this.classRight = (this.alignment === 'right');
        this.classLeft = (this.alignment === 'left');
    } // end ngOnChanges()

}
