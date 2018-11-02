import { Component, OnInit, OnDestroy, Output } from "@angular/core";
import { IJob } from "src/models/job-model";
import { Select, Store } from "@ngxs/store";
import { JobsState } from "src/redux/states/job.state";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators"
import { RequestJobs, SearchJobs } from "src/redux/actions/job.actions";
import { NgxSpinnerService } from "ngx-spinner";
import {FormControl, FormGroup} from '@angular/forms';
import { EventEmitter } from "protractor";

@Component({
  selector: "app-browse-jobs",
  templateUrl: "./browse-jobs.component.html",
  styleUrls: ["./browse-jobs.component.scss"]
})
export class BrowseJobsComponent implements OnInit, OnDestroy {
  isList: boolean;
  filterToggle: boolean;
  term: FormControl = new FormControl;

  @Select(JobsState.getIsLoading)
  isLoading$: Observable<boolean>;
  @Select(JobsState.getJobs)
  jobs$: Observable<IJob[]>;

  constructor(private store: Store,
              private spinner: NgxSpinnerService
    ) {
    this.isList = false;

    this.term.valueChanges
        .pipe(debounceTime(1000))
        .pipe(distinctUntilChanged())
        .subscribe(searchTerm =>
          this.store.dispatch(new SearchJobs(searchTerm))
          &&
          this.store.dispatch(new RequestJobs())
          )
  }

  ngOnInit() {    
    this.spinner.show();
    this.store.dispatch(new RequestJobs());
  }

  ngOnDestroy() {
    // this.searchTerm = '';
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

