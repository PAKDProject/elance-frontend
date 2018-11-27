import { Component, OnInit } from "@angular/core";
import { IJob } from "src/models/job-model";
import { Select, Store } from "@ngxs/store";
import { JobsState } from "src/redux/states/job.state";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import {
  RequestJobs,
  SearchJobs,
  FilterJobs
} from "src/redux/actions/job.actions";
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, NgForm } from "@angular/forms";
import { TempJobStorageService } from "src/services/temp-job/temp-job-storage.service";

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

  @Select(JobsState.getIsLoading)
  isLoading$: Observable<boolean>;
  @Select(JobsState.getJobs)
  jobs$: Observable<IJob[]>;

  constructor(private store: Store) {
    this.isList = false;
    this.searchTerm.valueChanges
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(
        searchTerm =>
          this.store.dispatch(new SearchJobs(searchTerm)) &&
          this.store.dispatch(new RequestJobs())
      );
  }

  ngOnInit() {
    this.store.dispatch(new RequestJobs());
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
}

export interface filterForm {
  minPayment: number;
  maxPayment: number;
  dateRadio: string;
}
