import { RequestRefreshUser, RequestDeleteContact } from './../../redux/actions/user.actions';
import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { IUser } from 'src/models/user-model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DragScrollComponent } from 'ngx-drag-scroll/lib';
import { MatDialog } from '@angular/material';
import { CreateJobModalComponent } from '../modals/create-job-modal/create-job-modal.component';
import { UserState } from 'src/redux/states/user.state';
import { JobFeedbackModalComponent } from '../modals/job-feedback-modal/job-feedback-modal.component';
import { IJob } from 'src/models/job-model';
import { NotificationService } from 'src/services/notifications/notification.service';
import { UserService } from 'src/services/user-service/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12];

  @ViewChild('activeJobs', { read: DragScrollComponent }) activeDrag: DragScrollComponent;
  @ViewChild('postedJobs', { read: DragScrollComponent }) postedDrag: DragScrollComponent;
  @ViewChild('appliedJobs', { read: DragScrollComponent }) appliedDrag: DragScrollComponent;
  @ViewChild('contacts', { read: DragScrollComponent }) contactsDrag: DragScrollComponent;

  @Select(UserState.getUser)
  user$: Observable<IUser>;

  user: Partial<IUser>;

  carousels: DragScrollComponent[];

  constructor(private dialog: MatDialog, private store: Store, private notification: NotificationService) { }

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
        appliedJobs: element.appliedJobs || [],
        postedJobs: element.postedJobs || [],
        activeJobs: element.activeJobs || [],
        contacts: element.contacts || []
      }


      if (this.user.postedJobs == undefined) { this.user.postedJobs = [] }
      if (this.user.activeJobs == undefined) { this.user.activeJobs = [] }
      if (this.user.appliedJobs == undefined) { this.user.appliedJobs = [] }

      //TEMP
      // this.user.contacts.push(this.user.contacts[0])
      // this.user.activeJobs = [
      //   {
      //     title: 'Temp Title 1',
      //     dateDue: new Date('2020-02-02'),
      //     datePosted: new Date('2020-02-02'),
      //     employerName: 'Jeff Bezos',
      //     employerID: 'yes',
      //     description: 'Placeholder description for the current job. Will be added later. Filling character space',
      //     payment: 3000
      //   },
      //   {
      //     title: 'Temp Title 2',
      //     dateDue: new Date('2020-02-02'),
      //     datePosted: new Date('2020-02-02'),
      //     employerName: 'Jeff Bezos',
      //     employerID: 'yes',
      //     description: 'Placeholder description for the current job. Will be added later. Filling character space',
      //     payment: 3000
      //   },
      //   {
      //     title: 'Temp Title 3',
      //     dateDue: new Date('2020-02-02'),
      //     datePosted: new Date('2020-02-02'),
      //     employerName: 'Jeff Bezos',
      //     employerID: 'yes',
      //     description: 'Placeholder description for the current job. Will be added later. Filling character space',
      //     payment: 3000
      //   }
      // ]
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
      this.ngOnInit()
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

  deleteContact($event: Partial<IUser>) {
    this.store.dispatch(new RequestDeleteContact($event.id)).subscribe(() => {
      this.notification.showInfo("Removed Contact");
    })
  }
}
