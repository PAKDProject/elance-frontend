import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { JobsState } from 'src/redux/states/job.state';
import { NotificationService } from 'src/services/notifications/notification.service';

@Component({
  selector: 'jobs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  jobs: IJob[]
  @Select(JobsState.getJobs) jobs$: Observable<IJob[]>

  constructor(public notificationService: NotificationService) { }

  ngOnInit() {
    this.jobs$.subscribe(jobs => {
      this.jobs = jobs
    })
  }

  //Hides the job
  hideJob(j: IJob) {
    this.jobs.splice(this.jobs.indexOf(j),1);

    this.notificationService.showSuccess('This job has been hidden from your list','Job Hidden')
    // this.notificationService.showInfo(
    //   'Job Hidden <br/> <button type="button" class="btn clear btn-toastr" onclick="">OK</button>', ""
    // )
  }
}
