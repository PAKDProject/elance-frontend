import { Component, OnInit } from '@angular/core';
import { TempJobStorageService } from '../temp-job-storage.service';

@Component({
  selector: 'app-browse-jobs',
  templateUrl: './browse-jobs.component.html',
  styleUrls: ['./browse-jobs.component.scss']
})
export class BrowseJobsComponent implements OnInit {
  
  isList: boolean;

  constructor(private jobService: TempJobStorageService) {
    this.isList = false;
   }

  ngOnInit() {
  }

  //Inverts list type
  changeListType() {
    this.isList = !this.isList;
  }
}
