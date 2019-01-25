import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';

@Component({
  selector: 'dashboard-posted-jobs',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.scss']
})
export class PostedComponent implements OnInit {
  @Input('JobsIn') jobs: IJob[];

  constructor() { }

  ngOnInit() {
  }

}
