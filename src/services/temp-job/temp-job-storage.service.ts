import { Injectable, Pipe } from "@angular/core";
import { IJob } from "src/models/job-model";
import { of, Observable } from "rxjs";
import { delay, map, tap } from "rxjs/operators";
import { filterForm } from "src/app/browse-jobs/browse-jobs.component";
import { transformAll } from "@angular/compiler/src/render3/r3_ast";
import { InactiveJobCardComponent } from "src/app/cards/inactive-job-card/inactive-job-card.component";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TempJobStorageService {
  searchApplied: boolean;
  lastSearch: string;

  filterApplied: boolean;
  lastFilter: filterForm;

  constructor(private _http: HttpClient) {}

  private jobsMaster: IJob[];
  private jobs: IJob[];

  getAllJobs(): Observable<IJob[]> {
    return of(this.jobs).pipe(delay(1000));
  }

  getJobs(): Observable<IJob[]> {
    return this._http.get("http://localhost:3000/jobs").pipe(
      map(res => {
        const { jobs } = res as { jobs: IJob[] };

        return jobs;
      })
    );
    //.subscribe(console.log);
  }

  performSearch(searchBy: string) {
    if (this.filterApplied) {
      if (searchBy.length > 0) {
        this.searchApplied = true;
        this.lastSearch = searchBy.toLocaleLowerCase();
      } else {
        this.searchApplied = false;
      }
      this.performFilter(this.lastFilter);
    } else {
      if (searchBy.length > 0) {
        this.jobs = this.jobsMaster.filter(
          (j: IJob) =>
            j.title
              .toLocaleLowerCase()
              .indexOf(searchBy.toLocaleLowerCase()) !== -1
        );
        this.searchApplied = true;
        this.lastSearch = searchBy;
      } else {
        this.jobs = this.jobsMaster;
        this.searchApplied = false;
      }
    }
  }

  performFilter(filterForm: filterForm) {
    //Reset jobs array to all jobs
    this.jobs = this.jobsMaster;

    this.filterApplied = true;
    this.lastFilter = filterForm;

    //Default values
    if (!filterForm.minPayment) {
      filterForm.minPayment = 0;
    }
    if (!filterForm.maxPayment) {
      filterForm.maxPayment = 1000000000000;
    }

    //If a search is applied
    if (this.searchApplied && filterForm) {
      this.jobs = this.jobsMaster.filter(
        (j: IJob) =>
          j.payment > filterForm.minPayment &&
          j.payment < filterForm.maxPayment &&
          j.title.toLocaleLowerCase().indexOf(this.lastSearch) !== -1
      );
    }
    //Else
    else {
      this.jobs = this.jobsMaster.filter(
        (j: IJob) =>
          j.payment > filterForm.minPayment && j.payment < filterForm.maxPayment
      );
    }

    switch (filterForm.dateRadio) {
      case "newToOld":
        this.jobs.sort(function(a, b) {
          var jobA = a.datePosted,
            jobB = b.datePosted;
          if (jobA > jobB) return -1;
          if (jobB > jobA) return 1;
        });
        break;
      case "oldToNew":
        this.jobs
          .sort(function(a, b) {
            var jobA = a.datePosted,
              jobB = b.datePosted;
            if (jobA > jobB) return -1;
            if (jobB > jobA) return 1;
          })
          .reverse();
        break;
    }
  }

  addJob(value: IJob) {
    this.jobsMaster.push(value);
  }

  clearJobs() {
    this.jobsMaster = [];
  }

  addSampleJobs() {
    this.jobsMaster = [
      {
        id: "1",
        title: "Software Developer",
        employerName: "Bob Bossman",
        employerID: "1",
        location: "Dublin",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.",
        datePosted: new Date("2018-10-19T00:00:00"),
        payment: 10000
      },
      {
        id: "2",
        title: "Frontend Developer",
        employerName: "Susan CEO",
        employerID: "1",
        location: "Galway",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.",
        datePosted: new Date("2018-10-20T00:00:00"),
        payment: 1000000
      },
      {
        id: "3",
        title: "Backend Developer",
        employerName: "Eddie Employer",
        employerID: "1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.",
        datePosted: new Date("2018-10-21T00:00:00"),
        payment: 10750
      },
      {
        id: "4",
        title: "Carpenter",
        employerName: "Jason Jobgiver",
        employerID: "1",
        location: "Sligo",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.",
        datePosted: new Date("2018-10-22T00:00:00"),
        dateAccepted: new Date("2018-10-29T00:00:00"),
        dateDue: new Date("2018-12-01T00:00:00"),
        payment: 12000,
        progress: 0.3
      },
      {
        id: "5",
        title: "Roofer",
        employerName: "John Smith",
        employerID: "1",

        location: "Cork",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.",
        datePosted: new Date("2018-10-23T00:00:00"),
        dateAccepted: new Date("2018-10-29T00:00:00"),
        dateDue: new Date("2018-12-01T00:00:00"),
        payment: 8000,
        progress: 0.5
      },
      {
        id: "6",
        title: "Artist",
        employerName: "Jane Doe",
        employerID: "1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.",
        datePosted: new Date("2018-10-24T00:00:00"),
        dateAccepted: new Date("2018-10-29T00:00:00"),
        dateDue: new Date("2018-12-01T00:00:00"),
        payment: 9000,
        progress: 0.8
      }
    ];

    this.jobsMaster.sort(function(a, b) {
      var jobA = a.datePosted,
        jobB = b.datePosted;
      if (jobA > jobB) return -1;
      if (jobB > jobA) return 1;
    });
    this.jobs = this.jobsMaster;
  }
}
