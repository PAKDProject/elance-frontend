import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IJob } from 'src/models/job-model';

@Component({
  selector: 'jobs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input('JobsInput')jobs: IJob[]
  @Output() notify: EventEmitter<IJob> = new EventEmitter<IJob>(); 

  constructor() { }
  
  //Hides the job
  hideJob(j: IJob) {
    this.notify.emit(j);
  }
}
