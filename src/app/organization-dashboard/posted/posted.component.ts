import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { CreateJobModalComponent } from 'src/app/modals/create-job-modal/create-job-modal.component';
import { MatDialog } from '@angular/material';
import { IOrganisation } from 'src/models/organisation-model';
import { Store } from '@ngxs/store';
import { bool } from 'aws-sdk/clients/signer';
import { OrganisationService } from 'src/services/organisation-service/organisation.service';

@Component({
  selector: 'dashboard-posted-jobs',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.scss']
})
export class PostedComponent implements OnInit {
  @Input('JobsIn') jobs: Partial<IJob>[];
  @Input('OrgIn') org: IOrganisation;
  @Output() refresh: EventEmitter<bool> = new EventEmitter<bool>();

  constructor(private dialog: MatDialog, private store: Store, private orgService: OrganisationService) { }

  ngOnInit() {
  }


  createJob(): void {
    this.dialog.open(CreateJobModalComponent, {
      data: this.org
    }).afterClosed().subscribe(() => {
      this.refresh.emit(true);
      this.orgService.getOrganisationByID(this.org.id).subscribe((res) => {
        this.jobs = res.jobsPosted;
      })
    });

  }

  refreshUser(event) {
    this.orgService.getOrganisationByID(this.org.id).subscribe((res) => {
      this.jobs = res.jobsPosted;
    })
  }
}
