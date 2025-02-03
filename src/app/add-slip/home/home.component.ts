import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BranchService } from '../../services/branch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
onJobOrd() {
this.router.navigate(['/job_order/order'])
}
onClaim() {
  this.router.navigate(['/job_order/claim'])
}
  branchName: string | null = null;

  constructor(
    private authService: AuthService,
    private branchService: BranchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const decodedToken = this.authService.getDecodedToken();

    if (
      decodedToken &&
      decodedToken.role === 'branchUser' &&
      decodedToken.branch
    ) {
      const branchId = decodedToken.branch;
      this.fetchBranchName(branchId);
    } else {
      this.branchName = 'User'; // Fallback if no branch info
    }
  }

  /** Fetch branch name using the branch ID */
  fetchBranchName(branchId: string): void {
    this.branchService.getBranchById(branchId).subscribe({
      next: (response) => {
        this.branchName = response.data.name; // Set the branch name from API response
      },
      error: (err) => {
        console.error('Error fetching branch data:', err);
        this.branchName = 'User'; // Fallback if API call fails
      },
    });
  }
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
