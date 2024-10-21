import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static BASE_URL = 'http://localhost:2424'; // Adjust based on your backend's port

  constructor(private http: HttpClient) { }

  /*** Register & User login */

  // User registration (matches backend register endpoint)
  registerUser(registration: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/user/register`, registration);
  }

  // User login (matches backend login endpoint)
  loginUser(loginDetails: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/user/login`, loginDetails);
  }
}

