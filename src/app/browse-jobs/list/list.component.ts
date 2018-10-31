import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { TempJobStorageService } from 'src/services/temp-job/temp-job-storage.service';

@Component({
  selector: 'jobs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  jobs: IJob[]

  constructor(private _jobService: TempJobStorageService) { }

  ngOnInit() {
    this._jobService.getAllJobs().subscribe(jobs => {
      this.jobs = jobs
    });
  }

}
