import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveJobModalComponent } from './active-job-modal.component';

describe('ActiveJobModalComponent', () => {
  let component: ActiveJobModalComponent;
  let fixture: ComponentFixture<ActiveJobModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveJobModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveJobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
