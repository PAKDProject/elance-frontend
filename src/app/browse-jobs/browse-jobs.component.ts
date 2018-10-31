import { Component, OnInit } from "@angular/core";
import { TempJobStorageService } from "src/services/temp-job/temp-job-storage.service";
import { IJob } from "src/models/job-model";
import { Select, Store } from "@ngxs/store";
import { JobsState } from "src/redux/states/job.state";
import { Observable } from "rxjs";
import { RequestJobs } from "src/redux/actions/job.actions";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-browse-jobs",
  templateUrl: "./browse-jobs.component.html",
  styleUrls: ["./browse-jobs.component.scss"]
})
export class BrowseJobsComponent implements OnInit {
  isList: boolean;
  filterToggle: boolean;
  jobs: IJob[];
  @Select(JobsState.getIsLoading)
  isLoading$: Observable<boolean>;
  @Select(JobsState.getJobs)
  jobs$: Observable<IJob[]>;

  constructor(private store: Store, private spinner: NgxSpinnerService) {
    this.isList = false;
  }

  ngOnInit() {
    this.spinner.show();
    this.store.dispatch(new RequestJobs());
    this.jobs$.subscribe(jobs => {
      this.jobs = jobs;
    });

    this.isLoading$.subscribe(bool => {
      alert(bool);
    });
  }

  //Inverts list type
  changeListType() {
    this.isList = !this.isList;
  }

  //Toggles the filter area
  openFilter() {
    this.filterToggle = !this.filterToggle;
  }

  refresh() {
    this.store.dispatch(new RequestJobs());
  }
}
