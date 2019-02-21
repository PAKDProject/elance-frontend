import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IJob } from 'src/models/job-model';
import { Store, Select } from '@ngxs/store';
import { RequestRemoveActiveJob } from 'src/redux/actions/user.actions';
import { UserState } from 'src/redux/states/user.state';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/user-model';
import { OrgsState } from 'src/redux/states/organisation.state';
import { IOrganisation } from 'src/models/organisation-model';

@Component({
  selector: 'app-active-job-modal',
  templateUrl: './active-job-modal.component.html',
  styleUrls: ['./active-job-modal.component.scss']
})
export class ActiveJobModalComponent implements OnInit {


  @Select(UserState.getUser) user$: Observable<IUser>;
  @Select(OrgsState.getOrgs) org$;

  admin: boolean;

  constructor(
    public dialogRef: MatDialogRef<ActiveJobModalComponent>,
    private _store: Store,
    @Inject(MAT_DIALOG_DATA) public data: IJob) { }

  ngOnInit(): void {
    this.admin = this.isAdmin();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  completeJob(jobData: Partial<IJob>) {
    this.user$.subscribe((user) => {
      this._store.dispatch(new RequestRemoveActiveJob(jobData, user.id));
    });
  }


  isAdmin() {
    let isAdmin = false;
    this.org$.subscribe((res) => {
      res.forEach(org => {
        if (org.id === this.data.employerID) {
          isAdmin = true
        }
      });
    })
    return isAdmin
  }

}
