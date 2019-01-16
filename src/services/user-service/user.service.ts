import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { IUser } from "src/models/user-model";
import { Observable, throwError, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { Store } from "@ngxs/store";
import { RequestUserSuccessAction } from "src/redux/actions/user.actions";
import { environment } from "src/environments/environment";
import { IJob } from "src/models/job-model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  endpoint: string = `${environment.backendUrl}/users`;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient, private _store: Store) { }
  /**
   * Returns all users in collection
   */
  getAllUsers(): Observable<IUser[]> {
    return this.http.get(`${this.endpoint}`).pipe(
      map(res => {
        let response = res as { users: IUser[] };
        return response.users;
      }),
      catchError(this.handleError)
    );
  }
  /**
   * Returns one user based on their userId
   * @param userId Type : string
   */
  getUserByID(userId: string): Observable<IUser> {
    return this.http.get(`${this.endpoint}/${userId}`).pipe(
      map(res => {
        let response = res as { user: IUser };
        return response.user;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Create a new user. Returns the created object
   * @param user Type : IUser
   */
  createUser(user: IUser): void {
    this.http
      .post<IUser>(this.endpoint, JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe();
  }
  /**
   * Update a User with new details. Only pass in new properties as object of type any
   * @param updatedUser Type : any
   * @param userId Type: string
   */
  updateUser(updatedUser: Partial<IUser>, userId: string): Observable<IUser> {
    return this.http
      .put<IUser>(
        `${this.endpoint}/${userId}`,
        JSON.stringify(updatedUser),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  /**
   * Delete a user by their userId
   * @param userId Type : string
   */
  deleteUser(userId: string): Observable<IUser> {
    return this.http
      .delete<IUser>(`${this.endpoint}/${userId}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Applying for a job
   * @param activeJobs The array of active jobs for the user
   * @param userId The id of the user taking the job
   * @param jobId The id of the job being applied for
   */
  applyForAJob(
    activeJobs: IJob[],
    userId: string,
    jobId: string
  ): Observable<IUser> {
    return this.http
      .put<IUser>(`${this.endpoint}/${userId}/${jobId}`, { activeJobs })
      .pipe(catchError(this.handleError));
  }

  batchGetUsers(applicantIds: string[]): Observable<IUser[]> {
    console.log(applicantIds);
    return this.http
      .post(
        `${this.endpoint}/batch`,
        JSON.stringify(applicantIds),
        this.httpOptions
      )
      .pipe(
        map(res => {
          let response = res as { users: IUser[] };
          return response.users;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`
      );
    }
    return throwError(error);
  }
}
