import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimService } from '../../services/claim.service';
import { CommonModule } from '@angular/common';
import { Claim } from '../../models/claim';

@Component({
  selector: 'app-claim',
  imports: [CommonModule],
  templateUrl: './claim.component.html',
  styleUrl: './claim.component.css',
})
export class ClaimComponent {
  claims: Claim[] = []; // Array to hold claims

  constructor(private claimService: ClaimService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchClaims(); // Fetch claims when component is initialized
  }

  // Fetch claims from the backend
  fetchClaims(): void {
    this.claimService.getClaims().subscribe(
      (data) => {
        this.claims = data; // Assign the fetched claims to the claims array
      },
      (error) => {
        console.error('Error fetching claims:', error);
      }
    );
  }
  // Navigate back to job order page
  goBack() {
    this.router.navigate(['/job_order']);
  }
}
