import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { PageLayoutComponent } from './core/page-layout/page-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/AUTH/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/AUTH/signup/signup.component').then(m => m.SignupComponent),
  },
  {
    path: '',
    component: PageLayoutComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: 'adminPanel',
        data: { role: 'ADMIN' }, // only ADMIN
        loadComponent: () =>
          import('./pages/ADMIN/admin-dashboard/admin-dashboard.component').then(
            m => m.AdminDashboardComponent
          ),
      },
      {
        path: "adminPanel/CreateProduct",
        loadComponent: () =>
          import("./pages/ADMIN/create-product/create-product.component")
            .then((m) => m.CreateProductComponent),
      },
      {
        path: "adminPanel/CreateUser",
        loadComponent: () =>
          import("./pages/ADMIN/create-user/create-user.component")
            .then((m) => m.CreateUserComponent),
      },
      {
        path: 'adminPanel/InquiryRecords',
        loadComponent: () =>
          import(
            './pages/ADMIN/inquiry-records/inquiry-records.component'
          ).then((m) => m.InquiryRecordsComponent),
      },
      {
        path: 'userPanel',
        // canActivate: [authGuard],
        data: { role: 'USER' }, // only USER
        loadComponent: () =>
          import('./pages/USER/user-dashboard/user-dashboard.component').then(
            m => m.UserDashboardComponent
          ),
      },
      {
        path: 'userPanel/SearchDoc',
        loadComponent: () =>
          import('./pages/USER/search-doc/search-doc.component').then(
            m => m.SearchDocComponent
          ),
      },
      {
        path: 'userPanel/SearchRef',
        loadComponent: () =>
          import('./pages/USER/search-ref/search-ref.component').then(
            m => m.SearchRefComponent
          ),
      }
    ],
  },
];
