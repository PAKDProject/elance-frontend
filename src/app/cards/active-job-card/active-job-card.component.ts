import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { MatDialog } from '@angular/material';
import { ActiveJobModalComponent } from 'src/app/modals/active-job-modal/active-job-modal.component';

@Component({
  selector: 'active-job-card',
  templateUrl: './active-job-card.component.html',
  styleUrls: ['./active-job-card.component.scss']
})
export class ActiveJobCardComponent {

  @Input('JobInput') job: IJob;

  constructor(public dialog: MatDialog) {}

  openJobModal(): void {
    const dialogRef = this.dialog.open(ActiveJobModalComponent, {
      width: '1000px',
      data: this.job
    })
  }
}
