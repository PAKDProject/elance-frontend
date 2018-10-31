import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { TempJobStorageService } from 'src/services/temp-job/temp-job-storage.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { JobsState } from 'src/redux/states/job.state';

@Component({
  selector: 'jobs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  jobs: IJob[]
  @Select(JobsState.getJobs) jobs$: Observable<IJob[]>

  constructor() { }

  ngOnInit() {
    this.jobs$.subscribe(jobs => {
      this.jobs = jobs
    })
  }

}
