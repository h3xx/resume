import {
    Component,
    Input,
} from '@angular/core';

@Component({
    selector: 'app-forkme',
    styleUrls: [
        './forkme.component.scss',
    ],
    templateUrl: './forkme.component.html',
})
export class ForkmeComponent {

    @Input() public readonly url?: string;
    @Input() public readonly text1: string = 'Fork me';
    @Input() public readonly text2: string = 'On GitHub';
    @Input() public readonly alignment: 'right' | 'left' = 'left';

}
