// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class Api {
//   private apiUrl = 'http://localhost:8000'; 

//   constructor(private http: HttpClient) { }

//   // Test GET endpoint
//   testBackend(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/`);
//   }

//   // // Upload a file
//   // uploadFile(file: File): Observable<any> {
//   //   const formData = new FormData();
//   //   formData.append('file', file);
//   //   return this.http.post(`${this.apiUrl}/upload`, formData);
//   // }

//   // // Send text to process endpoint
//   // processText(text: string): Observable<any> {
//   //   return this.http.post(`${this.apiUrl}/process`, { text });
//   // }
// }

//need to properly connect the  backend api to the frontend
//angular 16 with standalone components - no app module