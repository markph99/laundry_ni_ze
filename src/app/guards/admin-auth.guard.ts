import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 🔹 Check if user is logged in
  if (!authService.isAuthenticated()) {
    router.navigate(['/claim/login']);
    return false;
  }

  // 🔹 Check if user is an admin
  if (!authService.isAdmin()) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
}
