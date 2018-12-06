import { Component, OnInit } from "@angular/core";
import { IJob } from "src/models/job-model";
import { Select, Store } from "@ngxs/store";
import { JobsState } from "src/redux/states/job.state";
import { UserState } from "src/redux/states/user.state"
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import {
  RequestJobs,
  SearchJobs,
  FilterJobs
} from "src/redux/actions/job.actions";
import { FormControl, NgForm } from "@angular/forms";
@Component({
  selector: "app-browse-jobs",
  templateUrl: "./browse-jobs.component.html",
  styleUrls: ["./browse-jobs.component.scss"]
})
export class BrowseJobsComponent implements OnInit {
  isList: boolean;
  filterToggle: boolean;
  showSkillsForm: boolean = true;
  searchTerm: FormControl = new FormControl();

  dateOrderRadio: string = "newToOld";

  jobs: IJob[];
  lastJobHidden: IJob;

  @Select(JobsState.getIsLoading)
  isLoading$: Observable<boolean>;
  @Select(JobsState.getJobs)
  jobs$: Observable<IJob[]>;
  @Select(UserState.getSkillCount)
  skillsCount$: Observable<number>

  constructor(private store: Store) {
    this.isList = false;
    this.searchTerm.valueChanges
      .pipe(debounceTime(50))
      .pipe(distinctUntilChanged())
      .subscribe(
        searchTerm =>
          this.store.dispatch(new SearchJobs(searchTerm)) &&
          this.store.dispatch(new RequestJobs())
      );
  }

  ngOnInit() {
    // this.store.dispatch(new RequestJobs());
    this.jobs$.subscribe(jobs => {
      this.jobs = jobs
    })
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

  applyFilters(filters: NgForm) {
    let f = filters.value as filterForm;

    console.log("Dispatching filters");
    this.store.dispatch(new FilterJobs(f));
    this.store.dispatch(new RequestJobs());
  }

  dismissForm(e: boolean) {
    if (e === true) this.showSkillsForm = false;
  }

  hiddenJobIndex: number;
  hideJob(j: IJob) {
    if (j) {
      console.log('Hiding Job ' + j.title);

      this.hiddenJobIndex = this.jobs.indexOf(j);
      this.jobs.splice(this.jobs.indexOf(j), 1);

      this.lastJobHidden = j;
      setTimeout(() => {
        this.lastJobHidden = null;
      }, 10000);
    }
    else {
      console.log('Job not found')
    }
  }
  undoHide(j: IJob) {
    if (j) {
      this.jobs.splice(this.hiddenJobIndex, 0, j);
    }
    else {
      console.log('Job not found')
    }
  }
}

export interface filterForm {
  minPayment: number;
  maxPayment: number;
  dateRadio: string;
}
