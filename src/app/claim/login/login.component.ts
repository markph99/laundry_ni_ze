import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';
  showLoading: boolean = false;  // Variable to show loading spinner
  showSuccess: boolean = false;  // Variable to show success toast

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      alert('Please enter both username and password.');
      return;
    }

    // Show loading spinner
    this.showLoading = true;

    // Send login request to backend
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Store the JWT token in localStorage
        this.authService.saveToken(response.token);

        // Show success popup
        this.showSuccess = true;

        // Hide the success popup after 3 seconds
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);

        // Hide the loading spinner
        this.showLoading = false;

        // Redirect to another page
        this.router.navigate(['/claim']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Invalid username or password';

        // Hide loading spinner on error
        this.showLoading = false;
      }
    });
  }
}
