import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../../core/page-layout/page-layout.component';
import { CommonModule } from '@angular/common';
import { MatCard } from "@angular/material/card";
import { MatSidenavContent, MatSidenav, MatSidenavContainer } from "@angular/material/sidenav";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,  MatListModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  constructor(private router: Router){}
  usersMenu = { open: false };

  toggleMenu(menu: any) {
    menu.open = !menu.open;
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
