import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { TipBalloonComponent } from './clippy-balloon.component';

describe('TipBalloonComponent', () => {
    let component: TipBalloonComponent;
    let fixture: ComponentFixture<TipBalloonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TipBalloonComponent ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TipBalloonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
