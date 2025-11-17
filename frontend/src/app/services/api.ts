import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient) { }

  // Test GET route
  testBackend(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`).pipe(
      catchError(this.handleError)
    );
  }

  //upload file 
uploadFile(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);  
  return this.http.post(`${this.apiUrl}/upload`, formData);
}

  // Upload resume
  uploadResume(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload-resume/`, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong with the API'));
  }
}

//need to properly connect the  backend api to the frontend
//angular 16 with standalone components - no app module