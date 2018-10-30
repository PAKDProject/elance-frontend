import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveJobListCardComponent } from './active-job-list-card.component';

describe('ActiveJobListCardComponent', () => {
  let component: ActiveJobListCardComponent;
  let fixture: ComponentFixture<ActiveJobListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveJobListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveJobListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
