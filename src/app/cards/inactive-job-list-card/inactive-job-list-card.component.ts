import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { MatDialog } from '@angular/material';
import { InactiveJobModalComponent } from 'src/app/modals/inactive-job-modal/inactive-job-modal.component';

@Component({
  selector: 'inactive-job-list-card',
  templateUrl: './inactive-job-list-card.component.html',
  styleUrls: ['./inactive-job-list-card.component.scss']
})
export class InactiveJobListCardComponent{

  @Input('canHide') canHide: boolean = false;
  @Input('JobInput') job: IJob;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>(); 

  constructor(public dialog: MatDialog) {}

  openJobModal(): void {
    const dialogRef = this.dialog.open(InactiveJobModalComponent, {
      maxWidth: '1000px',
      data: this.job
    })
  }

  hideJob() {
    this.notify.emit(true);
  }
}
