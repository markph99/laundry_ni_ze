import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  createUserForBranch(payload: { username: string; password: string; branchId: string }) {
    return this.http.post<{ message: string; data: any }>(this.apiUrl, payload);
  }
}
