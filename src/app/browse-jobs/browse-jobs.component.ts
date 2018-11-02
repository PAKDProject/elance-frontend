import { Component, OnInit, OnDestroy } from "@angular/core";
import { TempJobStorageService } from "src/services/temp-job/temp-job-storage.service";
import { IJob } from "src/models/job-model";
import { Select, Store } from "@ngxs/store";
import { JobsState } from "src/redux/states/job.state";
import { Observable } from "rxjs";
import { RequestJobs } from "src/redux/actions/job.actions";
import { NgxSpinnerService } from "ngx-spinner";
import { ThemePalette } from "@angular/material";

@Component({
  selector: "app-browse-jobs",
  templateUrl: "./browse-jobs.component.html",
  styleUrls: ["./browse-jobs.component.scss"]
})
export class BrowseJobsComponent implements OnInit, OnDestroy {
  isList: boolean;
  filterToggle: boolean;

  _searchTerm: string;
  get searchTerm(): string{
    return this._searchTerm;
  }
  set searchTerm(value: string){
    this._searchTerm = value;
    this.jobService.performSearch(this.searchTerm)
    this.store.dispatch(new RequestJobs());
  }

  @Select(JobsState.getIsLoading)
  isLoading$: Observable<boolean>;
  @Select(JobsState.getJobs)
  jobs$: Observable<IJob[]>;

  constructor(private store: Store,
              private spinner: NgxSpinnerService,
              private jobService: TempJobStorageService
    ) {
    this.isList = false;
  }

  ngOnInit() {
    this.jobService.addSampleJobs();
    
    this.spinner.show();
    this.store.dispatch(new RequestJobs());
  }

  ngOnDestroy() {
    this.searchTerm = '';
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

