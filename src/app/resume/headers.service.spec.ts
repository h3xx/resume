import {
    async,
    TestBed,
} from '@angular/core/testing';
import { AppModule } from '@app/app.module';
import { ResumeModule } from './resume.module';

import { HeadersService } from './headers.service';

describe('HeadersService', () => {
    let service: HeadersService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                ResumeModule,
            ],
        })
        .compileComponents();
        service = TestBed.inject(HeadersService);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
