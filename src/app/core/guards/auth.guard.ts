// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// export const authGuard: CanActivateFn = () => {
//   const auth = inject(AuthService);
//   const router = inject(Router);

//   if (auth.checkAuth()) {
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false;
//   }
// };

import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.checkAuth()) {
    // Not logged in
    router.navigate(['/login']);
    return false;
  }

  // Optional: Check user role if defined on route data
  const requiredRole = route.data?.['role'] as 'USER' | 'ADMIN' | undefined;
  const userRole = auth.getUserCategory();

  if (requiredRole && userRole !== requiredRole) {
    // Unauthorized role
    alert('You are not authorized to access this page');
    router.navigate([userRole === 'ADMIN' ? '/admin-dashboard' : '/user-dashboard']);
    return false;
  }

  return true;
};
