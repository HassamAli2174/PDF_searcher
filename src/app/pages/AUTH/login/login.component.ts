import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginid = '';
  password = '';

  constructor(private router: Router, private auth: AuthService) { }

  onLogin() {
    const login = this.loginid.toLowerCase();
    const pass = this.password.toLowerCase();
    if (login === 'admin' && pass === 'admin') {
      sessionStorage.setItem('role', 'ADMIN');
      this.router.navigate(['/adminPanel']);
      
    } else if (login === 'user' && pass === 'user'){
      sessionStorage.setItem('role', 'USER');
      this.router.navigate(['/userPanel']);
    }
    //----------------- when api is called ------------------

    // this.auth.login(this.loginid, this.password).subscribe({
    //   next: (res) => {
    //     if (res?.jwtToken) {
    //       // Redirect based on user category
    //       const category = res.usercat?.toUpperCase();
    //       if (category === 'ADMIN') {
    //         this.router.navigate(['/admin-dashboard']);
    //       } else if (category === 'USER') {
    //         this.router.navigate(['/user-dashboard']);
    //       } else {
    //         alert('Unknown user category');
    //       }
    //     } else {
    //       alert(res.loginstatus || 'Invalid credentials');
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Login failed:', err);
    //     alert('Login request failed');
    //   },
    // });
  }
}
