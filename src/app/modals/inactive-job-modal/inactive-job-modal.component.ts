import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IJob } from 'src/models/job-model';

@Component({
  selector: 'inactive-job-modal',
  templateUrl: './inactive-job-modal.component.html',
  styleUrls: ['./inactive-job-modal.component.scss']
})
export class InactiveJobModalComponent {

  constructor(
    public dialogRef: MatDialogRef<InactiveJobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IJob) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  apply(): void {
    console.log('Applied for job');
  }
}
