import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/models/user-model';
import { JobsState } from 'src/redux/states/job.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IJob } from 'src/models/job-model';
import { RequestJobs } from 'src/redux/actions/job.actions';
import { DragScrollComponent } from 'ngx-drag-scroll/lib';
import { MatDialog } from '@angular/material';
import { CreateJobModalComponent } from '../modals/create-job-modal/create-job-modal.component';
import { ActiveJobModalComponent } from '../modals/active-job-modal/active-job-modal.component';
import { InactiveJobModalComponent } from '../modals/inactive-job-modal/inactive-job-modal.component';
import { UserState } from 'src/redux/states/user.state';
import { JobFeedbackModalComponent } from '../modals/job-feedback-modal/job-feedback-modal.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  @Select(UserState.getUser)
  user$: Observable<IUser>;

  user: Partial<IUser>;

  constructor(private dialog: MatDialog, private store: Store) { }

  @ViewChild('activeJobs', { read: DragScrollComponent }) activeCarousel: DragScrollComponent;
  @ViewChild('inactiveJobs', { read: DragScrollComponent }) inactiveCarousel: DragScrollComponent;

  ngOnInit() {
    this.user$.subscribe(element => {
      this.user = {
        fName: element.fName,
        lName: element.lName,
        tagline: element.tagline,
        summary: element.summary,
        educationItems: element.educationItems,
        skills: element.skills,
        jobHistory: element.jobHistory,
        appliedJobs: element.appliedJobs,
        postedJobs: element.postedJobs
      }
    })
  }

  moveCarousel(direction: string, carousel: number) {
    if (direction == 'left') {
      switch (carousel) {
        case 1:
          this.activeCarousel.moveLeft();
          break;
        case 2:
          this.inactiveCarousel.moveLeft();
          break;
      }
    }
    else {
      switch (carousel) {
        case 1:
          this.activeCarousel.moveRight();
          break;
        case 2:
          this.inactiveCarousel.moveRight();
          break;
      }
    }
  }

  openModal(): void {
    this.dialog.open(CreateJobModalComponent, {
      data: this.user
    });
  }

  
  testFeedbackModal(): void {
    let testJob: IJob = {
      id: "1800-YEET-SKEET", // Not Shown
      title: "Title",
      employerID: "2900-SKEET-YEET", //Not shown
      employerName: "Big Chungus",
      description: "Lorem ipsum dolor dolor bills yall",
      dateDue: new Date(),
      datePosted: new Date(),
      dateAccepted: new Date(),
      dateCompleted: new Date(),
      location: 'Dublin',
      progress: 90, //Not needed for this
      payment: 4000,
    }
    this.dialog.open(JobFeedbackModalComponent, {
      data: testJob
    });
  }
}
