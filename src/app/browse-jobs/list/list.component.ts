import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { Select } from '@ngxs/store';
import { UserState } from 'src/redux/states/user.state';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/user-model';

@Component({
  selector: 'jobs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  @Select(UserState.getUser)
  user$: Observable<IUser>
  filteredjobs: IJob[] = []

  @Input('JobsInput')jobs: IJob[]
  @Output() notify: EventEmitter<IJob> = new EventEmitter<IJob>(); 

  constructor() { }
  
  ngOnInit() {
    this.user$.subscribe(u => {
      this.jobs.forEach(j => {
        if(j.employerID != u.id)
        { this.filteredjobs.push(j) }
      })
    }).unsubscribe()
  }

  //Hides the job
  hideJob(j: IJob) {
    this.notify.emit(j);
  }
}
