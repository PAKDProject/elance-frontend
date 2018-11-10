import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobModalComponent } from './create-job-modal.component';

describe('CreateJobModalComponent', () => {
  let component: CreateJobModalComponent;
  let fixture: ComponentFixture<CreateJobModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateJobModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
