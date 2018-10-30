import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IUser } from '../models/user-model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  endpoint: string = 'localhost:3000/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }
  /**
   * Returns all users in collection
   */
  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.endpoint}`).pipe(catchError(this.handleError));
  }
  /**
   * Returns one user based on their email address
   * @param email Type : string
   */
  getUserByEmail(email: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.endpoint}/${email}`).pipe(catchError(this.handleError));
  }
  /**
   * Find a number of users by a First Name
   * @param fName Type : string
   */
  getUsersByFName(fName: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.endpoint}/fname/${fName}`).pipe(catchError(this.handleError));
  }
  /**
   * Find a number of user by a Last Name
   * @param lName Type: string
   */
  getUsersByLName(lName: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.endpoint}/lname/${lName}`).pipe(catchError(this.handleError));
  }
  /**
   * Create a new user. Returns the created object
   * @param user Type : IUser
   */
  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.endpoint, JSON.stringify(user), this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * Update a User with new details
   * @param updatedUser Type : IUser
   */
  updateUser(updatedUser: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.endpoint}/${updatedUser.email}`, JSON.stringify(updatedUser), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  /**
   * Delete a user by their email address
   * @param email Type : string
   */
  deleteUser(email: string): Observable<IUser> {
    return this.http.delete<IUser>(`${this.endpoint}/${email}`).pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
