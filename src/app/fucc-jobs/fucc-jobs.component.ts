import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { MatDialog } from '@angular/material';
import { InactiveJobModalComponent } from '../modals/inactive-job-modal/inactive-job-modal.component';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { JobsState } from 'src/redux/states/job.state';
import { UserState } from 'src/redux/states/user.state';
import { IUser } from 'src/models/user-model';

@Component({
  selector: 'fucc-jobs',
  templateUrl: './fucc-jobs.component.html',
  styleUrls: ['./fucc-jobs.component.scss']
})
export class FuccJobsComponent implements OnInit {
  @Output() dismissFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  fuccJob: IJob[]
  user: IUser
  @Select(UserState.getUser) user$: Observable<IUser>
  @Select(JobsState.getRecommendedJobs) fuccJobs$: Observable<{ job: IJob, pointsForJob: number }[]>
  @Select(JobsState.getIsLoading) isLoading$: Observable<boolean>

  constructor(private dialog: MatDialog) {
    this.user$.subscribe(res => {
      this.user = res
    })
  }

  ngOnInit() {
    this.fuccJobs$.subscribe(res => {
      if (res !== undefined) {
        this.fuccJob = res.map(obj => {
          let job = obj.job
          job.pointsForJob = obj.pointsForJob

          return job
        });
      }
    })
  }

  dismiss() { this.dismissFormEmit.emit(true) }

  openJob(job: IJob) {
    this.dialog.open(InactiveJobModalComponent, {
      width: '1000px',
      data: { job: job, type: 'user' }
    })
  }
}
