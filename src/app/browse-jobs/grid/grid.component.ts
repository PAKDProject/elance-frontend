import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IJob } from 'src/models/job-model';
import { UserState } from 'src/redux/states/user.state';
import { IUser } from 'src/models/user-model';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
@Component({
  selector: 'jobs-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Select(UserState.getUser)
  user$: Observable<IUser>

  @Input('JobsInput') jobs: IJob[]
  filteredjobs: IJob[] = []
  @Output() notify: EventEmitter<IJob> = new EventEmitter<IJob>()

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
