import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService to get the token
import { Claim } from '../models/claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = 'http://localhost:3000/api/claims';

  constructor(private http: HttpClient, private authService: AuthService) { }

 // Get all Claims for the current user and their branch
 getClaims(): Observable<Claim[]> {
  const token = this.authService.getToken(); // Get the token from AuthService
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`, // Add token to Authorization header
  });

  return this.http.get<Claim[]>(this.apiUrl, { headers }); // Get claims from backend
}

// Create a new claim
createClaim(claimData: Claim): Observable<Claim> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.post<Claim>(this.apiUrl, claimData, { headers }); // Post new claim data to backend
}

// Update a claim by ID
updateClaim(id: string, claimData: Claim): Observable<Claim> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.put<Claim>(`${this.apiUrl}/${id}`, claimData, { headers });
}

// Delete a claim by ID
deleteClaim(id: string): Observable<any> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
}
}
