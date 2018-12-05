import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IJob } from 'src/models/job-model';
@Component({
  selector: 'jobs-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  @Input('JobsInput') jobs: IJob[]
  @Output() notify: EventEmitter<IJob> = new EventEmitter<IJob>(); 

  constructor() { }

  //Hides the job
  hideJob(j: IJob) {
    this.notify.emit(j);
  }
}
