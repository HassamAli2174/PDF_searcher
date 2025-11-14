import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'user-dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then(m => m.SignupComponent),
  },
  {
    path: 'admin-dashboard',
    canActivate: [authGuard],
    data: { role: 'ADMIN' }, // only ADMIN
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard.component').then(
        m => m.AdminDashboardComponent
      ),
  },
  {
    path: 'user-dashboard',
    canActivate: [authGuard],
    data: { role: 'USER' }, // only USER
    loadComponent: () =>
      import('./pages/user-dashboard/user-dashboard.component').then(
        m => m.UserDashboardComponent
      ),
  },
  {
    path: 'SearchDoc',
    loadComponent: () =>
      import('./pages/search-doc/search-doc.component').then(
        m => m.SearchDocComponent
      ),
  },
  {
    path: 'SearchRef',
    loadComponent: () =>
      import('./pages/search-ref/search-ref.component').then(
        m => m.SearchRefComponent
      ),
  },
];


// import { Routes } from '@angular/router';
// import { authGuard } from './guards/auth.guard';

// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   {
//     path: 'login',
//     loadComponent: () =>
//       import('./pages/login/login.component').then((m) => m.LoginComponent),
//   },
//   {
//     path: 'signup',
//     loadComponent: () =>
//       import('./pages/signup/signup.component').then((m) => m.SignupComponent),
//   },
//   {
//     path: 'admin-dashboard',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/admin-dashboard/admin-dashboard.component').then(
//         (m) => m.AdminDashboardComponent
//       ),
//   },
//   {
//     path: 'user-dashboard',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/user-dashboard/user-dashboard.component').then(
//         (m) => m.UserDashboardComponent
//       ),
//   },
//   {
//     path: 'SearchDoc',
//     // canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/search-doc/search-doc.component').then(
//         (m) => m.SearchDocComponent
//       ),
//   },
//   {
//     path: 'SearchRef',
//     // canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/search-ref/search-ref.component').then(
//         (m) => m.SearchRefComponent
//       ),
//   },
// ];
