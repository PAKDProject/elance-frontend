import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IJob } from 'src/models/job-model';
import { Store } from '@ngxs/store';
import { NotificationService } from 'src/services/notifications/notification.service';

@Component({
  selector: 'app-job-feedback-modal',
  templateUrl: './job-feedback-modal.component.html',
  styleUrls: ['./job-feedback-modal.component.scss']
})
export class JobFeedbackModalComponent implements OnInit {
  jobInfo: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<JobFeedbackModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IJob,
    private _store: Store,
    private _notification: NotificationService
  ) { }

  ngOnInit() {
  }
  
  closeModal() { this.dialogRef.close() }
  toggleJobInfo() { this.jobInfo = !this.jobInfo}
}
