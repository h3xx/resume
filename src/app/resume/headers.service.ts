import {
    Injectable,
} from '@angular/core';
import {
    BehaviorSubject,
} from 'rxjs';

import { Header } from './header.interface';

@Injectable()
export class HeadersService {

    public readonly headerPrefix = 'hdr-';

    public readonly headers = new BehaviorSubject<Header[] | undefined>(undefined);
    public readonly currentHeaderId = new BehaviorSubject<string | undefined>(undefined);

}
