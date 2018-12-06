import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IJob } from 'src/models/job-model';
import { Store } from '@ngxs/store';
import { ApplyForJob } from 'src/redux/actions/user.actions';

@Component({
  selector: 'inactive-job-modal',
  templateUrl: './inactive-job-modal.component.html',
  styleUrls: ['./inactive-job-modal.component.scss']
})
export class InactiveJobModalComponent {

  constructor(
    public dialogRef: MatDialogRef<InactiveJobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IJob,
    private _store: Store) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  apply(): void {
    this._store.dispatch(new ApplyForJob(this.data))
  }
}
