import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/app/models/job-model';
import { TempJobStorageService } from 'src/app/temp-job-storage.service';

@Component({
  selector: 'jobs-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  jobs: IJob[]

  constructor(private _jobService: TempJobStorageService) { }

  ngOnInit() {
    this.jobs = this._jobService.getAllJobs();
  }

}
