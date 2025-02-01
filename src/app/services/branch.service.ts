import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private apiUrl = 'http://localhost:3000/api/branches';

  constructor(private http: HttpClient) {}

  /** Helper function to get the Authorization header with JWT token */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage

    if (!token) {
      throw new Error('No token provided');
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /** Create a new branch */
  createBranch(branch: Branch): Observable<{ message: string; data: Branch }> {
    const headers = this.getAuthHeaders(); // Get headers with the token
    return this.http.post<{ message: string; data: Branch }>(this.apiUrl, branch, { headers });
  }

  /** Fetch all branches */
  getAllBranches(): Observable<{ message?: string; data: Branch[] }> {
    const headers = this.getAuthHeaders(); // Get headers with the token
    return this.http.get<{ message?: string; data: Branch[] }>(this.apiUrl, { headers });
  }

  /** Get branch by ID */
  getBranchById(id: string): Observable<{ message?: string; data: Branch }> {
    const headers = this.getAuthHeaders(); // Get headers with the token
    return this.http.get<{ message?: string; data: Branch }>(`${this.apiUrl}/${id}`, { headers });
  }

  /** Update a branch */
  updateBranch(id: string, updates: Partial<Branch>): Observable<{ message: string; data: Branch }> {
    const headers = this.getAuthHeaders(); // Get headers with the token
    return this.http.patch<{ message: string; data: Branch }>(`${this.apiUrl}/${id}`, updates, { headers });
  }

  /** Delete a branch */
  deleteBranch(id: string): Observable<{ message: string }> {
    const headers = this.getAuthHeaders(); // Get headers with the token
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, { headers });
  }
}
