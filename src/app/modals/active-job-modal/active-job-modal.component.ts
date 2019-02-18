import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IJob } from 'src/models/job-model';
import { Store, Select } from '@ngxs/store';
import { RequestRemoveActiveJob } from 'src/redux/actions/user.actions';
import { UserState } from 'src/redux/states/user.state';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/user-model';

@Component({
  selector: 'app-active-job-modal',
  templateUrl: './active-job-modal.component.html',
  styleUrls: ['./active-job-modal.component.scss']
})
export class ActiveJobModalComponent {
  @Select(UserState.getUser) user$: Observable<IUser>;

  constructor(
    public dialogRef: MatDialogRef<ActiveJobModalComponent>,
    private _store: Store,
    @Inject(MAT_DIALOG_DATA) public data: IJob) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  completeJob(jobData: Partial<IJob>) {
    this.user$.subscribe((user) => {
      this._store.dispatch(new RequestRemoveActiveJob(jobData, user.id));
    });
  }

}
