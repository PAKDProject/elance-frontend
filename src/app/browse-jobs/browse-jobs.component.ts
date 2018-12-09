import { Component, OnInit } from "@angular/core";
import { IJob } from "src/models/job-model";
import { Select, Store } from "@ngxs/store";
import { JobsState } from "src/redux/states/job.state";
import { UserState } from "src/redux/states/user.state"
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { RequestJobs, FilterJobs } from "src/redux/actions/job.actions";
import { FormControl, NgForm } from "@angular/forms";
@Component({
  selector: "app-browse-jobs",
  templateUrl: "./browse-jobs.component.html",
  styleUrls: ["./browse-jobs.component.scss"]
})
export class BrowseJobsComponent implements OnInit {
  isList: boolean = false;
  filterToggle: boolean = false;
  showSkillsForm: boolean = true;

  //For polling changes to the search box
  searchTerm: FormControl = new FormControl();

  //Makes the default order new to old
  dateOrderRadio: string = "newToOld";

  filters: filterForm;

  jobs: IJob[];
  lastJobHidden: IJob;

  @Select(JobsState.getIsLoading)
  isLoading$: Observable<boolean>;
  @Select(JobsState.getJobs)
  jobs$: Observable<IJob[]>;
  @Select(UserState.getSkillCount)
  skillsCount$: Observable<number>

  constructor(private store: Store) {
    this.filters = {
      minPayment: null,
      maxPayment: null,
      dateRadio: 'newToOld',
      searchTerm: null
    }
    
    this.searchTerm.valueChanges
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(
        searchTerm =>
        {
          this.filters.searchTerm = searchTerm;
          console.log("Searching for "+ searchTerm)
          this.performFilter();
        }
      );
  }

  applyFilters(filters: NgForm) {
    let prevSearch = (this.searchTerm.value)?(this.searchTerm.value):(null);
    this.filters = filters.value as filterForm;
    this.filters.searchTerm = prevSearch
    console.log("Filters applied");

    this.performFilter();
  }
  
  clearFilters() {
    let prevSearch = (this.searchTerm.value)?(this.searchTerm.value):(null);
    this.filters = {
      minPayment: null,
      maxPayment: null,
      dateRadio: 'newToOld',
      searchTerm: prevSearch
    }
    this.dateOrderRadio = "newToOld";

    console.log("Filters applied");

    this.performFilter();
  }

  performFilter() {
    console.log("Performing filter");
    console.table(this.filters);
    this.store.dispatch(new FilterJobs(this.filters));
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

  refresh() {
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

  //Toggles the filter area
  openFilter() {
    this.filterToggle = !this.filterToggle;
  }
}

export interface filterForm {
  minPayment: number;
  maxPayment: number;
  dateRadio: string;
  searchTerm: string;
}
