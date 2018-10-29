import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveJobCardComponent } from './active-job-card.component';

describe('ActiveJobCardComponent', () => {
  let component: ActiveJobCardComponent;
  let fixture: ComponentFixture<ActiveJobCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveJobCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
