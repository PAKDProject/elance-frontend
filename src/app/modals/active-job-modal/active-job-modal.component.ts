import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IJob } from 'src/app/models/job-model';

@Component({
  selector: 'app-active-job-modal',
  templateUrl: './active-job-modal.component.html',
  styleUrls: ['./active-job-modal.component.scss']
})
export class ActiveJobModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ActiveJobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data : IJob) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
