import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/app/models/job-model';

@Component({
  selector: 'jobs-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input('JobsInput') jobs: IJob

  constructor() { }

  ngOnInit() {
  }

}
