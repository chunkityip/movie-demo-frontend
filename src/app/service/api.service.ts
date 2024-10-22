import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private static BASE_URL = 'http://localhost:8080'; // Ensure this is correct

  constructor(private http: HttpClient) { }

  /** Auth */
  registerUser(registration: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/user/register`, registration);
  }

  loginUser(loginDetails: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/user/login`, loginDetails);
  }

  /** Shopping cart */
  createOrder(orderRequest: any): Observable<any> {
      return this.http.post(`${ApiService.BASE_URL}/order/create`, orderRequest);
    }
}


