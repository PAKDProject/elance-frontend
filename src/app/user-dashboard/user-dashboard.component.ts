import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/models/user-model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DragScrollComponent } from 'ngx-drag-scroll/lib';
import { MatDialog } from '@angular/material';
import { CreateJobModalComponent } from '../modals/create-job-modal/create-job-modal.component';
import { UserState } from 'src/redux/states/user.state';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  tempArray = [ 1,2,3,4,5,6,7,8,9,0,11,12 ];

  @ViewChild('activeJobs', {read: DragScrollComponent}) activeDrag: DragScrollComponent;
  @ViewChild('postedJobs', {read: DragScrollComponent}) postedDrag: DragScrollComponent;
  @ViewChild('appliedJobs', {read: DragScrollComponent}) appliedDrag: DragScrollComponent;

  @Select(UserState.getUser)
  user$: Observable<IUser>;

  user: Partial<IUser>;

  carousels: DragScrollComponent[];

  constructor(private dialog: MatDialog, private store: Store) { }

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

    this.carousels = [
      this.activeDrag,
      this.postedDrag,
      this.appliedDrag
    ]
  }

  openModal(): void {
    this.dialog.open(CreateJobModalComponent, {
      data: this.user
    });
  }

  moveDragLeft(index) {
    this.carousels[index].moveLeft()
  }
  moveDragRight(index) {
    this.carousels[index].moveRight()
  }
}
