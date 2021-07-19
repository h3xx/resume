import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsGraphComponent } from './skills-graph.component';

describe('SkillsGraphComponent', () => {
  let component: SkillsGraphComponent;
  let fixture: ComponentFixture<SkillsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
