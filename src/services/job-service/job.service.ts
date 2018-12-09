import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IJob } from 'src/models/job-model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NotificationService } from '../notifications/notification.service';
import { environment } from 'src/environments/environment';
import { filterForm } from 'src/app/browse-jobs/browse-jobs.component';
import { Job } from 'aws-sdk/clients/codepipeline';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  endpoint: string = `${environment.backendUrl}/jobs`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private _http: HttpClient, private _notification: NotificationService) { }

  /**
   * Get all jobs
   */
  getJobs(): Observable<IJob[]> {
    return this._http.get(this.endpoint).pipe(map((res) => {
      let response = res as { jobs: IJob[] };
      return response.jobs;
    }))
  }

  /**
   * Get job by a specific id
   * @param jobId string
   */
  getJobById(jobId: string): Observable<IJob> {
    return this._http.get(`${this.endpoint}/${jobId}`).pipe(map((res) => {
      let response = res as { job: IJob };
      return response.job;
    }))
  }

  /**
   * Creates a new job
   * @param job IJob object
   */
  createNewJob(job: IJob) {
    return this._http.post(this.endpoint, JSON.stringify(job), this.httpOptions).pipe(catchError(this.handleError));
  }

  /**
   * Update the details of a job
   * @param job IJob Object
   */
  updateJob(job: IJob) {
    this._http.put(`${this.endpoint}/${job.id}`, JSON.stringify(job), this.httpOptions).pipe(catchError(this.handleError))
  }

  /**
   * Delete a job
   * @param jobId string
   */
  deleteJob(jobId: string) {
    this._http.delete(`${this.endpoint}/${jobId}`).pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this._notification.showError(error.status.toString(), error.error.message)
      console.error('An error occurred:', error.error.message);
    } else {
      this._notification.showError(error.status.toString(), error.error.message)
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(error)
  }



  //Temp job searching
  searchJob(searchTerm: string): Observable<IJob[]>{
    return this._http.get(this.endpoint).pipe(map((res) => {
      let response = res as { jobs: IJob[] };
      
      response.jobs = (response.jobs.filter((j: IJob) =>
          j.title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1));
      
      return response.jobs;
    }))
  }
  filterJob(filters: filterForm): Observable<IJob[]> {
    return this._http.get(this.endpoint).pipe(map((res) => {
      let response = res as { jobs: IJob[] };
      console.log("yeet")
      console.table(filters);
      console.log(response.jobs);

      //Filtering & searching
      if(filters.searchTerm) {
        response.jobs = (response.jobs.filter((j: IJob) =>
        j.title.toLocaleLowerCase().indexOf(filters.searchTerm.toLocaleLowerCase()) !== -1));
      }
      if(filters.minPayment) {
        response.jobs = (response.jobs.filter((j: IJob) =>
        j.payment > filters.minPayment));
      }
      if(filters.maxPayment) {
        response.jobs = (response.jobs.filter((j: IJob) =>
        j.payment < filters.maxPayment));
      }

      //Sorting by date ascending and descending
      switch(filters.dateRadio)
      {
        case 'newToOld':
          response.jobs.sort(function (a, b) {
            var jobA = a.datePosted, jobB = b.datePosted;
            if (jobA > jobB) return -1;
            if (jobB > jobA) return 1;
          })
          break;
        case 'oldToNew':
          response.jobs.sort(function (a, b) {
            var jobA = a.datePosted, jobB = b.datePosted;
            if (jobA > jobB) return -1;
            if (jobB > jobA) return 1;
          }).reverse();
          break;
      }

      console.log(response.jobs);
        
      return response.jobs;
      }));
    }
}
