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
        jobHistory: element.jobHistory
      }})
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
}
