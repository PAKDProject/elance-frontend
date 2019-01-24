import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';

@Component({
  selector: 'dashboard-active-jobs',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  @Input('JobsIn') jobs: IJob[];

  constructor() { }

  ngOnInit() {
  }

}
