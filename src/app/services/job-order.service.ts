import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOrder } from '../models/job-order';

@Injectable({
  providedIn: 'root',
})
export class JobOrderService {
  private apiUrl = 'http://localhost:3000/job_order';


  constructor(private http: HttpClient) {}

  // Fetch all job orders (if needed)
  getJobOrders(): Observable<JobOrder[]> {
    return this.http.get<JobOrder[]>(this.apiUrl);
  }

  // Add a new job order
  addJobOrder(data: JobOrder): Observable<JobOrder> {
    return this.http.post<JobOrder>(this.apiUrl, data);
  }
}
