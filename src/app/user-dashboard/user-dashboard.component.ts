import { Component, OnInit } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { TempJobStorageService } from 'src/services/temp-job/temp-job-storage.service';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { RequestJobs } from 'src/redux/actions/job.actions';
import { JobsState } from 'src/redux/states/job.state';
import { MatDialog } from "@angular/material";
import { CreateJobModalComponent } from "../modals/create-job-modal/create-job-modal.component";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.scss"]
})
export class UserDashboardComponent implements OnInit {

  jobs: IJob[];
  
  @Select(JobsState.getJobs)
  jobs$: Observable<IJob[]>;

  constructor(private store: Store, private dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new RequestJobs());

    this.jobs$.subscribe(jobs => {
      this.jobs = jobs
    })
  }
  
  openModal(): void {
    this.dialog.open(CreateJobModalComponent, {
      maxWidth: "1000px"
    });
  }
}
