import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillContainerModalComponent } from './skill-container-modal.component';

describe('SkillContainerModalComponent', () => {
  let component: SkillContainerModalComponent;
  let fixture: ComponentFixture<SkillContainerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillContainerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillContainerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
