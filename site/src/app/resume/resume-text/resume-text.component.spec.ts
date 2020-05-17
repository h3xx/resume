import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeTextComponent } from './resume-text.component';

describe('ResumeTextComponent', () => {
  let component: ResumeTextComponent;
  let fixture: ComponentFixture<ResumeTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeTextComponent ]
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
