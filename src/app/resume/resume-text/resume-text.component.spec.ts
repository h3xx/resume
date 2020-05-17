import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import { AppModule } from '@app/app.module';
import { ResumeModule } from '../resume.module';

import { ResumeTextComponent } from './resume-text.component';

describe('ResumeTextComponent', () => {
    let component: ResumeTextComponent;
    let fixture: ComponentFixture<ResumeTextComponent>;

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
        fixture = TestBed.createComponent(ResumeTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
