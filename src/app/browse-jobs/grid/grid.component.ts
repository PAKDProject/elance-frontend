import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { Store, Select } from '@ngxs/store';
import { JobsState } from 'src/redux/states/job.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'jobs-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  jobs: IJob[]
  @Select(JobsState.getJobs) jobs$: Observable<IJob[]>

  constructor() { }

  ngOnInit() {
    this.jobs$.subscribe(jobs => {
      this.jobs = jobs
    })
  }

}
