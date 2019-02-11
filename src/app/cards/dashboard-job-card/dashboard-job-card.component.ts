import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { MatDialog } from '@angular/material';
import { ActiveJobModalComponent } from 'src/app/modals/active-job-modal/active-job-modal.component';

@Component({
  selector: 'dashboard-job-card',
  templateUrl: './dashboard-job-card.component.html',
  styleUrls: ['./dashboard-job-card.component.scss']
})
export class DashboardJobCardComponent implements OnInit {
  @Input('JobInput') job: IJob;
  // job: IJob = {
  //   title: 'Temp Title',
  //   dateDue: new Date('2020-02-02'),
  //   datePosted: new Date('2020-02-02'),
  //   employerName: 'Jeff Bezos',
  //   employerID: 'yes',
  //   description: 'Placeholder description for the current job. Will be added later. Filling character space',
  //   payment: 3000
  // }

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openJob(j: IJob) {
    const dialogRef = this.dialog.open(ActiveJobModalComponent, {
      data: j
    })
  }
}
