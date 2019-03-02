import { InactiveJobModalComponent } from 'src/app/modals/inactive-job-modal/inactive-job-modal.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IJob } from 'src/models/job-model';

@Component({
  selector: 'inactive-job-card',
  templateUrl: './inactive-job-card.component.html',
  styleUrls: ['./inactive-job-card.component.scss']
})
export class InactiveJobCardComponent {

  @Input('canHide') canHide: boolean = false;
  @Input('JobInput') job: IJob;
  @Input() type: string;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() active: EventEmitter<IJob> = new EventEmitter<IJob>();
  constructor(public dialog: MatDialog) { }

  openJobModal(): void {
    const dialogRef = this.dialog.open(InactiveJobModalComponent, {
      width: '1000px',
      data: { job: this.job, type: this.type }
    })

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.active.emit(data.active);
      }
    })
  }

  hideJob() {
    this.notify.emit(true);
  }
}
