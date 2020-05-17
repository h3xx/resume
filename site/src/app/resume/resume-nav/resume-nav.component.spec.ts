import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeNavComponent } from './resume-nav.component';

describe('ResumeNavComponent', () => {
  let component: ResumeNavComponent;
  let fixture: ComponentFixture<ResumeNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeNavComponent ]
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
