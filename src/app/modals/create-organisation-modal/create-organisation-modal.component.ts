import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Store, Select } from '@ngxs/store';
import { UserState } from 'src/redux/states/user.state';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/user-model';
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { IOrganisation } from 'src/models/organisation-model';
import { UploadImageModalComponent } from '../upload-image-modal/upload-image-modal.component';
import { CreateOrganisation } from 'src/redux/actions/organisation.actions';

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
  orgName: string = "";
  constructor(private _dialogRef: MatDialogRef<CreateOrganisationModalComponent>, private _dialog: MatDialog, private _store: Store, private _fb: FormBuilder) { }


  ngOnInit() {
    //Get the current user from state for later use
    this.user$.subscribe(u => {
      this.user = u;
    });

    //Initialize the new organisation object and assign admin user
    this.organisation = {
      organisationName: "",
      organisationEmail: "",
      //adminUser: this.user,
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
      this.orgName = data.organisationName;
    });
  }// end of init

  //#region getters
  get organisationName() {
    return this.organisationForm.get("organisationName");
  }
  get organisationEmail() {
    return this.organisationForm.get("organisationEmail");
  }
  get websiteUrl() {
    return this.organisationForm.get("websiteUrl")
  }
  get tagline() {
    return this.organisationForm.get("tagline");
  }
  //#endregion

  //Close modal
  onNoClick() {
    this._dialogRef.close();
  }

  //Check is admin user was added. If so create org and close modal
  createOrganisation() {
    if (1 === 1) {
      this._store.dispatch(new CreateOrganisation(this.organisation));
      this._dialogRef.close();
    }

  }

  //Open modal for Uploading logo image
  openUploadModal() {
    const dialogRef = this._dialog.open(UploadImageModalComponent, {
      data: "logo"
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.organisation.logoUrl = data;
      }
    })

  }



}
