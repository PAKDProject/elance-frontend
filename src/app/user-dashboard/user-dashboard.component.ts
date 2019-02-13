import { RequestRefreshUser } from './../../redux/actions/user.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/models/user-model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DragScrollComponent } from 'ngx-drag-scroll/lib';
import { MatDialog } from '@angular/material';
import { CreateJobModalComponent } from '../modals/create-job-modal/create-job-modal.component';
import { UserState } from 'src/redux/states/user.state';
import { JobFeedbackModalComponent } from '../modals/job-feedback-modal/job-feedback-modal.component';
import { IJob } from 'src/models/job-model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  tempJobs: IJob[] = [
      {
        id: "14071faf-1d96-4cf3-b657-65bae0363f77",
        title: "Office Assistant I",
        employerID: "14071faf-1d96-4cf3-b657-65bae0363f66",
        employerName: "Ghandi",
        description: "Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.",
        datePosted: new Date("03/31/2018"),
        dateAccepted: new Date("11/14/2017"),
        payment: 4533,
        progress: 29
    },
    {
        id: "71a6a660-4948-4d36-a124-f37eb1ff1489",
        entity: "job",
        title: "Teacher",
        employerID: "1800-yeet",
        employerName: "Photofeed",
        description: "Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.",
        datePosted: new Date("11/15/2017"),
        dateAccepted: new Date("07/02/2018"),
        payment: 820,
        progress: 98
    },
    {
        id: "79ac4980-0612-440c-a98d-99c5dd1f0181",
        entity: "job",
        title: "Structural Analysis Engineer",
        employerID: "1800-Skeet",
        employerName: "Skiba",
        description: "Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.",
        datePosted: new Date("09/20/2018"),
        dateAccepted: new Date("05/09/2018"),
        payment: 1337,
        progress: 46
    }
  ]
  @ViewChild('activeJobs', { read: DragScrollComponent }) activeDrag: DragScrollComponent;
  @ViewChild('postedJobs', { read: DragScrollComponent }) postedDrag: DragScrollComponent;
  @ViewChild('appliedJobs', { read: DragScrollComponent }) appliedDrag: DragScrollComponent;

  @Select(UserState.getUser)
  user$: Observable<IUser>;

  user: Partial<IUser>;

  carousels: DragScrollComponent[];

  constructor(private dialog: MatDialog, private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new RequestRefreshUser());
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
        postedJobs: element.postedJobs,
        activeJobs: element.activeJobs
      }
    })

    this.carousels = [
      this.activeDrag,
      this.postedDrag,
      this.appliedDrag
    ]
  }

  openModal(): void {
    const dialogRef = this.dialog.open(CreateJobModalComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(new RequestRefreshUser())
    })
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

  moveDragLeft(index) {
    this.carousels[index].moveLeft()
  }
  moveDragRight(index) {
    this.carousels[index].moveRight()
  }
}
