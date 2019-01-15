import { Component, OnInit, Input } from '@angular/core';
import { ActiveJobModalComponent } from 'src/app/modals/active-job-modal/active-job-modal.component';
import { MatDialog } from '@angular/material';
import { IJob } from 'src/models/job-model';

@Component({
  selector: 'completed-job-card',
  templateUrl: './completed-job.component.html',
  styleUrls: ['./completed-job.component.scss']
})
export class CompletedJobComponent {
  @Input('JobInput') job: IJob;
  constructor(public dialog: MatDialog) {}

  openJobModal(): void {
    const dialogRef = this.dialog.open(ActiveJobModalComponent, {
      width: '1000px',
      data: this.job
    })
  }
}
