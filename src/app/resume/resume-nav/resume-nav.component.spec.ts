import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import { AppModule } from '@app/app.module';
import { ResumeModule } from '../resume.module';

import { ResumeNavComponent } from './resume-nav.component';

describe('ResumeNavComponent', () => {
    let component: ResumeNavComponent;
    let fixture: ComponentFixture<ResumeNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                ResumeModule,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResumeNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
