import { Component, OnInit, ViewChild } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { RequestJobs } from 'src/redux/actions/job.actions';
import { JobsState } from 'src/redux/states/job.state';
import { MatDialog } from "@angular/material";
import { CreateJobModalComponent } from "../modals/create-job-modal/create-job-modal.component";
import { DragScrollComponent } from 'ngx-drag-scroll/lib';

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.scss"]
})
export class UserDashboardComponent implements OnInit {

  jobs: IJob[];

  //Carousels
  @ViewChild('activeJobs', {read: DragScrollComponent}) activeCarousel: DragScrollComponent;
  @ViewChild('inactiveJobs', {read: DragScrollComponent}) inactiveCarousel: DragScrollComponent;
  @ViewChild('contacts', {read: DragScrollComponent}) contactsCarousel: DragScrollComponent;
  
  moveCarousel(direction: string, carousel: number) {
    if(direction == 'left') {
      switch(carousel) {
        case 1:
          this.activeCarousel.moveLeft();
          break;
        case 2:
          this.inactiveCarousel.moveLeft();
          break;
        case 3:
          this.contactsCarousel.moveLeft();
          break;
      }
    }
    else {
      switch(carousel) {
        case 1:
          this.activeCarousel.moveRight();
          break;
        case 2:
          this.inactiveCarousel.moveRight();
          break;
        case 3:
          this.contactsCarousel.moveRight();
          break;
      }
    }
  }
  
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
    this.dialog.open(CreateJobModalComponent);
  }
}
