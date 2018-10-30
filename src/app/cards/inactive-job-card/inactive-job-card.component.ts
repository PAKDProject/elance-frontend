import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/models/job-model';

@Component({
  selector: 'inactive-job-card',
  templateUrl: './inactive-job-card.component.html',
  styleUrls: ['./inactive-job-card.component.scss']
})
export class InactiveJobCardComponent implements OnInit {

  @Input('JobInput') job: IJob;

  constructor() { }

  ngOnInit() {
  }

}
