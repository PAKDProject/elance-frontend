import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFeedbackModalComponent } from './job-feedback-modal.component';

describe('JobFeedbackModalComponent', () => {
  let component: JobFeedbackModalComponent;
  let fixture: ComponentFixture<JobFeedbackModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobFeedbackModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
