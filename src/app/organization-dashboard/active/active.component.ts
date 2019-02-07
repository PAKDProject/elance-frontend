import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { CreateJobModalComponent } from 'src/app/modals/create-job-modal/create-job-modal.component';
import { MatDialog } from '@angular/material';
import { IOrganisation } from 'src/models/organisation-model';

@Component({
  selector: 'dashboard-active-jobs',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  @Input('JobsIn') jobs: IJob[];
  @Input('OrgIn') org: IOrganisation;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  createJob(): void {
    this.dialog.open(CreateJobModalComponent, {
      data: this.org
    });
  }

}
