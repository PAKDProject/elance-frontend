import { InactiveJobModalComponent } from 'src/app/modals/inactive-job-modal/inactive-job-modal.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';

@Component({
  selector: 'inactive-job-card',
  templateUrl: './inactive-job-card.component.html',
  styleUrls: ['./inactive-job-card.component.scss']
})
export class InactiveJobCardComponent {

  @Input('JobInput') job: IJob;

  constructor(public dialog: MatDialog) {}

  openJobModal(): void {
    const dialogRef = this.dialog.open(InactiveJobModalComponent, {
      maxWidth: '1000px',
      data: this.job
    })
  }

}
