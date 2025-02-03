import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOrder } from '../models/job-order';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class JobOrderService {
  private apiUrl = 'http://localhost:3000/api/job_orders';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Create a new Job Order
  createJobOrder(jobOrderData: Partial<JobOrder>): Observable<JobOrder> {
    // Get the userId from the decoded token
    const userId = this.authService.getDecodedToken()?.userId; // Assuming the token has userId

    if (!userId) {
      throw new Error('User ID is not found in the token');
    }

    // Add userId to the jobOrderData
    const jobOrderWithUserId = {
      ...jobOrderData,
      userId: userId, // Adding userId to the request body
    };

    // Get the JWT token from localStorage
    const token = this.authService.getToken();

    // Set the Authorization header with the JWT token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Attach the token to the request header
    });

    // Send the request with the Authorization header
    return this.http.post<JobOrder>(this.apiUrl, jobOrderWithUserId, { headers });
  }

  // Get all Job Orders
  getAllJobOrders(): Observable<JobOrder[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<JobOrder[]>(this.apiUrl, { headers });
  }

  // Get a specific Job Order by ID
  getJobOrderById(id: string): Observable<JobOrder> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<JobOrder>(`${this.apiUrl}/${id}`, { headers });
  }

  // Update a Job Order by ID
  updateJobOrder(id: string, jobOrderData: Partial<JobOrder>): Observable<JobOrder> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<JobOrder>(`${this.apiUrl}/${id}`, jobOrderData, { headers });
  }

  // Delete a Job Order by ID
  deleteJobOrder(id: string): Observable<{ message: string }> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, { headers });
  }
}
