import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateOrganisationModalComponent } from '../modals/create-organisation-modal/create-organisation-modal.component';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss']
})
export class OrganizationDashboardComponent implements OnInit {

  constructor(private _dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this._dialog.open(CreateOrganisationModalComponent);
  }

}
