import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response) => {
          // Save the token
          this.authService.saveToken(response.token);

          // Redirect user if they are a branch user and have a branch assigned
          if (response.user.role === 'branchUser' && response.user.branch) {
            // If it's a branch user, redirect them to job orders page (branch-specific)
            this.router.navigate([`/job_order`]);
          } else {
            alert('Login failed. Only branch users are allowed.');
            this.router.navigate(['/login']); // Optionally redirect to login page
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Login failed. Please check your credentials.');
        },
      });
    }
  }
}
