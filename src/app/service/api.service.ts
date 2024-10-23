import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private static BASE_URL = 'http://localhost:8080';
  private adminName: string | null = ''; // Store admin name

  constructor(private http: HttpClient) {}

  /** Auth */
  registerUser(registration: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/user/register`, registration);
  }

  loginUser(loginDetails: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/user/login`, loginDetails);
  }

  // Set and Get Admin Name
  setAdminName(name: string): void {
    this.adminName = name;
  }

  getAdminName(): string | null {
    return this.adminName;
  }

  /** Fetch User Profile */
    getUserProfile(id: number): Observable<any> {
        return this.http.get(`${ApiService.BASE_URL}/user/profile/${id}`);
    }


  /** Shopping cart */
  createOrder(orderRequest: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/order/create`, orderRequest);
  }
}

