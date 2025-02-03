import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOrder } from '../models/job-order';

@Injectable({
  providedIn: 'root',
})
export class JobOrderService {
  private apiUrl = 'http://localhost:3000/api/job_orders';


  constructor(private http: HttpClient) {}

  // Fetch all job orders (if needed)
  getJobOrders(): Observable<JobOrder[]> {
    return this.http.get<JobOrder[]>(this.apiUrl);
  }

  // Add a new job order
  addJobOrder(data: JobOrder): Observable<JobOrder> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<JobOrder>(this.apiUrl, data, { headers });
  }
}
