import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

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
    this.auth.login(this.loginid, this.password).subscribe({
      next: (res) => {
        if (res?.jwtToken) {
          // Redirect based on user category
          const category = res.usercat?.toUpperCase();
          if (category === 'ADMIN') {
            this.router.navigate(['/admin-dashboard']);
          } else if (category === 'USER') {
            this.router.navigate(['/user-dashboard']);
          } else {
            alert('Unknown user category');
          }
        } else {
          alert(res.loginstatus || 'Invalid credentials');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login request failed');
      },
    });
  }
}
