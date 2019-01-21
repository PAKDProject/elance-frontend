import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store, Select } from '@ngxs/store';
import { UserState } from 'src/redux/states/user.state';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/user-model';
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { IOrganisation } from 'src/models/organisation-model';

@Component({
  selector: 'app-create-organisation-modal',
  templateUrl: './create-organisation-modal.component.html',
  styleUrls: ['./create-organisation-modal.component.scss']
})
export class CreateOrganisationModalComponent implements OnInit {

  @Select(UserState.getUser) user$: Observable<IUser>;
  organisationForm: FormGroup;
  organisation: IOrganisation;
  user: IUser;
  constructor(private _dialogRef: MatDialogRef<CreateOrganisationModalComponent>, private _store: Store, private _fb: FormBuilder) { }


  ngOnInit() {
    //Get the current user from state for later use
    this.user$.subscribe(u => {
      this.user = u;
    });
    //Initialize the new organisation object and assign admin user
    this.organisation = {
      organisationName: "",
      organisationEmail: "",
      adminUser: this.user,
    };

    //Set up reactive form fields
    this.organisationForm = this._fb.group({
      organisationName: [this.organisation.organisationName, [Validators.required]],
      organisationEmail: [this.organisation.organisationEmail, [Validators.required, Validators.email]],
      tagline: [this.organisation.tagline],
      websiteUrl: [this.organisation.websiteUrl],
      logoUrl: [""]
    });

    //Get values from form
    this.organisationForm.valueChanges.subscribe(data => {
      this.organisation.organisationName = data.organisationName;
      this.organisation.organisationEmail = data.organisationEmail;
      this.organisation.websiteUrl = data.websiteUrl;
      this.organisation.tagline = data.tagline;
      this.organisation.logoUrl = data.logoUrl;
    });
  }// end of init

  //#region getters
  get organisationName() {
    return this.organisationForm.get("organisationName");
  }
  get organisationEmail() {
    return this.organisationForm.get("organisationEmail");
  }
  //#endregion

  //Close modal
  onNoClick() {
    this._dialogRef.close();
  }



}
