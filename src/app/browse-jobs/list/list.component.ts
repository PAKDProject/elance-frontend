import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/app/models/job-model';

@Component({
  selector: 'jobs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  @Input('JobsInput') jobs : IJob

  constructor() { }

  ngOnInit() {
  }

}
