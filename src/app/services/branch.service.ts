import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  // Point this to your Express backend route
  private apiUrl = 'http://localhost:3000/api/branches';

  constructor(private http: HttpClient) {}

  createBranch(branch: Branch): Observable<{ message: string; data: Branch }> {
    return this.http.post<{ message: string; data: Branch }>(this.apiUrl, branch);
  }

  getAllBranches(): Observable<{ message?: string; data: Branch[] }> {
    // If your backend returns an object like { data: [...] }, we match that shape
    return this.http.get<{ message?: string; data: Branch[] }>(this.apiUrl);
  }


  getBranchById(id: string): Observable<{ message?: string; data: Branch }> {
    return this.http.get<{ message?: string; data: Branch }>(`${this.apiUrl}/${id}`);
  }


  updateBranch(id: string, updates: Partial<Branch>): Observable<{ message: string; data: Branch }> {
    return this.http.patch<{ message: string; data: Branch }>(`${this.apiUrl}/${id}`, updates);
  }


  deleteBranch(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}


