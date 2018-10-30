import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';

@Component({
  selector: 'inactive-job-list-card',
  templateUrl: './inactive-job-list-card.component.html',
  styleUrls: ['./inactive-job-list-card.component.scss']
})
export class InactiveJobListCardComponent implements OnInit {

  @Input('JobInput') job: IJob;

  constructor() { }

  ngOnInit() {
  }

}
