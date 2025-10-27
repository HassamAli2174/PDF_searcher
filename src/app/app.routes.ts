import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'SearchDoc',
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/search-doc/search-doc.component').then(
        (m) => m.SearchDocComponent
      ),
  },
  {
    path: 'SearchRef',
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/search-ref/search-ref.component').then(
        (m) => m.SearchRefComponent
      ),
  },
];
