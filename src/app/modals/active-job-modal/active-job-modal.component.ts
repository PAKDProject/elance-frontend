import { JobService } from 'src/services/job-service/job.service';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-job-modal',
  templateUrl: './active-job-modal.component.html',
  styleUrls: ['./active-job-modal.component.scss']
})
export class ActiveJobModalComponent implements OnInit {


  @Select(UserState.getUser) user$: Observable<IUser>;
  @Select(OrgsState.getOrgs) org$;

  admin: boolean;
  job_type: string;

  constructor(
    public dialogRef: MatDialogRef<ActiveJobModalComponent>,
    private _store: Store,
    @Inject(MAT_DIALOG_DATA) public data: IJob, private router: Router, private jobService: JobService) { }

  ngOnInit(): void {
    this.admin = this.isAdmin()
    alert(this.admin)
    this.jobService.getJobById(this.data.id).subscribe((res) => {
      this.data = res;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  completeJob() {
    this.data.progress = 100;
    this.data.dateCompleted = new Date();
    this._store.dispatch(new RequestRemoveActiveJob(this.data, this.data.chosenApplicant.id, this.job_type));
  }

  isAdmin() {
    let isAdmin = false;
    this.org$.subscribe((res) => {
      res.forEach(org => {
        if (org.id === this.data.employerID) {
          isAdmin = true
          this.job_type = 'org';
          return isAdmin
        }
      });
    });

    this.user$.subscribe((res) => {
      if (res.id === this.data.employerID) {
        isAdmin = true;
        this.job_type = 'user';
        return isAdmin
      }
    })
    return isAdmin
  }

  contact() {
    this.router.navigate(['/home/messages/' + 'sad34324-d73fsadas-DAB4GSUS-b801-42069LOL'])
  }

}
