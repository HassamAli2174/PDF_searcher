import { Component, Input, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule, MatToolbar],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.scss'],
})
export class TopbarComponent implements OnInit { 
  isSidebarOpen = true;
  userName = 'USER';
  @Input() collapsed: boolean = false;
  constructor(private router: Router) { }
  ngOnInit(): void {
    const role = sessionStorage.getItem('role');

    // Normalize role display
    if (role === 'ADMIN') {
      this.userName = 'Admin'.toUpperCase();
    } else {
      this.userName = 'User'.toUpperCase();
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
