import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
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
      .put(
        `${this.endpoint}/${userId}`,
        JSON.stringify(updatedUser),
        this.httpOptions
      ).pipe(map(res => {
        let response = res as { user: IUser };
        return response.user;
      }),
        catchError(this.handleError)
      )
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

  searchUsers(search: string): Observable<any> {
    const query = {
      query: {
        match_phrase_prefix: {
          fName: {
            query: search,
            max_expansions: 10
          }
        }
      }
    };
    return this.http.post(`${this.endpoint}/search`, JSON.stringify(query), this.httpOptions);
  }

  getTestUser1(): Observable<IUser> {
    return this.http.get(`${this.endpoint}/sad34324-d73fsadas-DAB4GSUS-b801-42069LOL`).pipe(
      map(res => {
        let response = res as { user: IUser };
        return response.user;
      }),
      catchError(this.handleError)
    );
  }

  getTestUser2(): Observable<IUser> {
    return this.http.get(`${this.endpoint}/d813c1eb-d73f-482f-b801-9519b664e706`).pipe(
      map(res => {
        let response = res as { user: IUser };
        return response.user;
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
