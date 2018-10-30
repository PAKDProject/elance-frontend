import { Component, OnInit } from '@angular/core';
import { TempJobStorageService } from '../temp-job-storage.service';
import { IJob } from '../models/job-model';

@Component({
  selector: 'app-browse-jobs',
  templateUrl: './browse-jobs.component.html',
  styleUrls: ['./browse-jobs.component.scss']
})
export class BrowseJobsComponent implements OnInit {
  
  isList: boolean;
  jobs: IJob[];

  constructor(private jobService: TempJobStorageService) {
    this.isList = false;
   }

  ngOnInit() {
    this.jobService.addSampleJobs();
    this.jobs = this.jobService.getAllJobs();
  }

  //Inverts list type
  changeListType() {
    this.isList = !this.isList;
  }
}
