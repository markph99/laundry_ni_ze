import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showLogoutModal: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  // Show the logout confirmation modal
  openLogoutConfirmation(): void {
    this.showLogoutModal = true;
  }

  // Close the logout confirmation modal
  closeLogoutConfirmation(): void {
    this.showLogoutModal = false; // Close the confirmation modal
  }

  // Perform the logout action
  logout(): void {
    // Perform logout action (remove token and redirect to login page)
    this.authService.logout();
    this.router.navigate(['/']);
    this.showLogoutModal = false; // Close the modal after logout
  }
}
