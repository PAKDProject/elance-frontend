import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveJobListCardComponent } from './inactive-job-list-card.component';

describe('InactiveJobListCardComponent', () => {
  let component: InactiveJobListCardComponent;
  let fixture: ComponentFixture<InactiveJobListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveJobListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveJobListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
