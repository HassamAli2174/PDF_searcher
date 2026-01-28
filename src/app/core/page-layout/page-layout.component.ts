import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { TopbarComponent } from "../topbar/topbar";
import { Sidebar } from "../sidebar/sidebar";
interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  open?: boolean;
  children?: MenuItem[];
}
@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, RouterOutlet, TopbarComponent, Sidebar],
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent {
  collapsed = false;
  // 🔐 TEMP ROLE (replace later with AuthService)
  role: 'ADMIN' | 'USER' = (sessionStorage.getItem('role') as any) || 'USER';
  // ================= USER MENU =================

  userMenu: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'home',
      route: '/userPanel'
    },
    {
      label: 'Documents',
      icon: 'description',
      open: false,
      children: [
        { label: 'Search By Doc ID', route: '/userPanel/SearchDoc' },
        { label: 'Search By Ref ID', route: '/userPanel/SearchRef' }
      ]
    },
    {
      label: 'Logout',
      icon: 'logout'
    }
  ];

  // ================= ADMIN MENU =================
  adminMenu: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/adminPanel'
    },
    {
      label: 'Users',
      icon: 'people',
      open: false,
      children: [
        { label: 'Create User', route: '/adminPanel/CreateUser' },
        { label: 'Inquiries', route: '/adminPanel/InquiryRecords' },
      ]
    },
    {
      label: 'Logout',
      icon: 'logout'
    }
  ];

  constructor(private router: Router) { }
  /** Toggle sidebar collapse/expand */
  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  /** Check if sidebar is collapsed */
  isCollapsed(): boolean {
    return this.collapsed;
  }

  /** Toggle submenu open state */
  toggleMenu(item: MenuItem): void {
    item.open = !item.open;
  }

  /** Return active menu based on role */
  activeMenu(): MenuItem[] {
    return this.role === 'ADMIN' ? this.adminMenu : this.userMenu;
  }

  /** Logout user */
  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}