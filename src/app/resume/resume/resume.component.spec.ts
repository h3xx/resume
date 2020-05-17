import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import { AppModule } from '@app/app.module';
import { ResumeModule } from '../resume.module';

import { ResumeComponent } from './resume.component';

describe('ResumeComponent', () => {
    let component: ResumeComponent;
    let fixture: ComponentFixture<ResumeComponent>;

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
        fixture = TestBed.createComponent(ResumeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
