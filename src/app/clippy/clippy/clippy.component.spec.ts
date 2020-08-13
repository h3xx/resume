import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { ClippyComponent } from './clippy.component';

describe('ClippyComponent', () => {
    let component: ClippyComponent;
    let fixture: ComponentFixture<ClippyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ClippyComponent ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClippyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
