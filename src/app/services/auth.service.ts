import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  // 🔑 Dummy login method (replace with API later)
  login(email: string, password: string): boolean {
    if (email === 'test@test.com' && password === '123456') {
      this.isAuthenticated = true;
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  }

  // ✅ Logout method
  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  // ✅ This is the missing method!
  checkAuth(): boolean {
    return this.isAuthenticated || localStorage.getItem('auth') === 'true';
  }
}
