import { Component, OnInit } from '@angular/core';
import { TempJobStorageService } from 'src/services/temp-job/temp-job-storage.service';
import { IJob } from 'src/models/job-model';

@Component({
  selector: 'app-browse-jobs',
  templateUrl: './browse-jobs.component.html',
  styleUrls: ['./browse-jobs.component.scss']
})
export class BrowseJobsComponent implements OnInit {

  isList: boolean;
  filterToggle: boolean;
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

  //Toggles the filter area
  openFilter() {
    this.filterToggle = !this.filterToggle
  }
}
