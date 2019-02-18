import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { MatDialog } from '@angular/material';
import { ActiveJobModalComponent } from 'src/app/modals/active-job-modal/active-job-modal.component';
import { InactiveJobModalComponent } from 'src/app/modals/inactive-job-modal/inactive-job-modal.component';

@Component({
  selector: 'dashboard-job-card',
  templateUrl: './dashboard-job-card.component.html',
  styleUrls: ['./dashboard-job-card.component.scss']
})
export class DashboardJobCardComponent implements OnInit {
  @Input('JobInput') job: IJob;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  //   this.job = {
  //   title: 'Temp Title',
  //   dateDue: new Date('2020-02-02'),
  //   datePosted: new Date('2020-02-02'),
  //   employerName: 'Jeff Bezos',
  //   employerID: 'yes',
  //   description: 'Placeholder description for the current job. Will be added later. Filling character space',
  //   payment: 3000
  // }
  }

  openJob() {
    if(this.job.chosenApplicant)
    { this.openActiveJobModal() }
    else
    { this.openInactiveJobModal() }
  }

  openActiveJobModal() {
    console.log('1')
    const dialogRef = this.dialog.open(ActiveJobModalComponent, {
      data: this.job
    })
  }

  openInactiveJobModal() {
    console.log('2')
    const dialogRef = this.dialog.open(InactiveJobModalComponent, {
      data: this.job
    })
  }
}
