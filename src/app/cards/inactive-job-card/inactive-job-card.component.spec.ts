import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveJobCardComponent } from './inactive-job-card.component';

describe('InactiveJobCardComponent', () => {
  let component: InactiveJobCardComponent;
  let fixture: ComponentFixture<InactiveJobCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveJobCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
