import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private isAuthenticated = false;
  private userCategory: 'USER' | 'ADMIN' | null = null;

  constructor(private api: ApiService, private router: Router) {
    const token = localStorage.getItem(this.TOKEN_KEY);
    this.isAuthenticated = !!token;
    this.userCategory = localStorage.getItem('usercat') as any;
  }

  login(loginid: string, password: string): Observable<any> {
    return this.api.postData('login', { loginid, password }).pipe(
      tap(res => {
        if (res?.jwtToken) {
          localStorage.setItem(this.TOKEN_KEY, res.jwtToken);
          localStorage.setItem('usercat', res.usercat);
          this.isAuthenticated = true;
          this.userCategory = res.usercat;
        } else {
          this.isAuthenticated = false;
          this.userCategory = null;
        }
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userCategory = null;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('usercat');
    this.router.navigate(['/login']);
  }

  checkAuth(): boolean {
    return this.isAuthenticated || !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserCategory(): 'USER' | 'ADMIN' | null {
    return this.userCategory;
  }
}













// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, tap } from 'rxjs';
// import { ApiService } from './api.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private readonly TOKEN_KEY = 'auth_token';
//   private readonly USER_ROLE = 'user_role';
//   private isAuthenticated = false;

//   constructor(private api: ApiService, private router: Router) {
//     const token = localStorage.getItem(this.TOKEN_KEY);
//     this.isAuthenticated = !!token;
//   }

//   // 🔹 Login through API
//   login(loginid: string, password: string): Observable<any> {
//     const body = { loginid, password };

//     return this.api.postData('login', body).pipe(
//       tap((res) => {
//         console.log('🧩 Login API Response:', res);
//         // if (res && res.token) {
//         //   localStorage.setItem(this.TOKEN_KEY, res.token);
//         //   this.isAuthenticated = true;


//         // Check for valid token
//         if (res?.jwtToken) {
//           localStorage.setItem(this.TOKEN_KEY, res.jwtToken);
//           localStorage.setItem(this.USER_ROLE, res.usercat || 'USER');
//           this.isAuthenticated = true;

//         }
//       })
//     );
//   }

//   // 🔹 Logout
//   logout(): void {
//     this.isAuthenticated = false;
//     localStorage.removeItem(this.TOKEN_KEY);
//     localStorage.removeItem(this.USER_ROLE);
//     this.router.navigate(['/login']);
//   }

//   // 🔹 Check if logged in
//   checkAuth(): boolean {
//     return this.isAuthenticated || !!localStorage.getItem(this.TOKEN_KEY);
//   }

//   // 🔹 Get JWT token
//   getToken(): string | null {
//     return localStorage.getItem(this.TOKEN_KEY);
//   }

//   // ✅ Get stored role
//   getUserRole(): string | null {
//     return localStorage.getItem(this.USER_ROLE);
//   }
// }






























// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, tap } from 'rxjs';
// import { ApiService } from './api.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private readonly TOKEN_KEY = 'auth_token';
//   private isAuthenticated = false;

//   constructor(private api:ApiService, private router: Router) {
//     const token = localStorage.getItem(this.TOKEN_KEY);
//     this.isAuthenticated = !!token;
//   }

//   // loin(loginid: string, password: string): Observable<any> {
//   //   const isValidUser = loginid === 'admin' && password === 'admin';
//   //   this.isAuthenticated = isValidUser;
//   //   const body = { loginid, password };
//   //   return this.api.postWithToken('login', body);
//   // }


//   // 🔑 Dummy login method (replace with API later)
//   login(loginid: string, password: string): Observable<any> {
//     const body = { loginid, password };

//     return this.api.postData('login', body).pipe(
//       tap((res) => {
//         if (res && res.token) {
//           // store JWT
//           localStorage.setItem(this.TOKEN_KEY, res.token);
//           this.isAuthenticated = true;
//         }
//       })
//     );
//   }
//   // ✅ Logout method
//   logout(): void {
//     this.isAuthenticated = false;
//     localStorage.removeItem(this.TOKEN_KEY);
//     this.router.navigate(['/login']);
//   }

//   // ✅ This is the missing method!
//   checkAuth(): boolean {
//     return this.isAuthenticated || localStorage.getItem('auth') === 'true';
//   }
//   getToken(): string | null {
//     return localStorage.getItem(this.TOKEN_KEY);
//   }
// }
