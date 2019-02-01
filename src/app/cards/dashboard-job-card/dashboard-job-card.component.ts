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

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openJob(j: IJob) {
    const dialogRef = this.dialog.open(ActiveJobModalComponent, {
      data: j
    })
  }
}
