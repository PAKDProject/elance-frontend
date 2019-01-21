import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganisationModalComponent } from './create-organisation-modal.component';

describe('CreateOrganisationModalComponent', () => {
  let component: CreateOrganisationModalComponent;
  let fixture: ComponentFixture<CreateOrganisationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrganisationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganisationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
