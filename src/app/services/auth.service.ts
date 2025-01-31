import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users/login';
  private signUpUrl = 'http://localhost:3000/api/users'; // URL to your backend sign-up endpoint

  constructor(private http: HttpClient) {}

  // ✅ Login function - Calls backend to authenticate user
  login(username: string, password: string): Observable<{ token: string; user: any }> {
    return this.http.post<{ token: string; user: any }>(this.apiUrl, { username, password });
  }

  // 💾 Save token in localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // 🔎 Retrieve token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // 📜 Decode JWT Token to get user info
  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1])); // Decodes JWT payload
    } catch (error) {
      return null;
    }
  }

  // ✅ Check if user is logged in
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // 🔒 Check if user is Admin
  isAdmin(): boolean {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.role === 'admin';
  }

  // 🛑 Logout user (Remove token)
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // ✅ Sign-Up function - Calls backend to create a new user
  signUp(username: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(this.signUpUrl, { username, password, role });
  }
}
