import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveJobModalComponent } from './inactive-job-modal.component';

describe('InactiveJobModalComponent', () => {
  let component: InactiveJobModalComponent;
  let fixture: ComponentFixture<InactiveJobModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveJobModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveJobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
