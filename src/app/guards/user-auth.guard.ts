import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = (route, state) => {
  // Inject AuthService and Router into the guard
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is authenticated and has the 'branchUser' role
  const isAuthenticated = authService.isAuthenticated();
  const isBranchUser = authService.isBranchUser();

  // If the user is authenticated and has 'branchUser' role, allow access
  if (isAuthenticated && isBranchUser) {
    router.navigate(['/job_order/login']);
    return true;
  } else {
    // If not authenticated or not a 'branchUser', redirect to login
    router.navigate(['/']);  // Redirect to login page
    return false;
  }
};
