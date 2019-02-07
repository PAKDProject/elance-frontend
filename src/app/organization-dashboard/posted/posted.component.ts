import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { CreateJobModalComponent } from 'src/app/modals/create-job-modal/create-job-modal.component';
import { MatDialog } from '@angular/material';
import { IOrganisation } from 'src/models/organisation-model';

@Component({
  selector: 'dashboard-posted-jobs',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.scss']
})
export class PostedComponent implements OnInit {
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
