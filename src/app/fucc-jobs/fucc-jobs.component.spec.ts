import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuccJobsComponent } from './fucc-jobs.component';

describe('FuccJobsComponent', () => {
  let component: FuccJobsComponent;
  let fixture: ComponentFixture<FuccJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuccJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuccJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
