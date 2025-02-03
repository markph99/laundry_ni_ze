import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  const isBranchUser = authService.isBranchUser();

  // Allow access if authenticated and role is branchUser
  if (isAuthenticated && isBranchUser) {
    return true;  // Remove the navigation here
  } else {
    // Redirect to login if not authenticated or incorrect role
    router.navigate(['/job_order/login']);
    return false;
  }
};

