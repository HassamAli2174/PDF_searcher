import { isPlatformBrowser, NgIf, NgForOf, CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, AfterViewInit, ElementRef, QueryList, ViewChildren, OnChanges, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLinkWithHref } from '@angular/router';
interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  open?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLinkWithHref, NgIf, NgForOf],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar{

  constructor(private router: Router) { }

  @Input() collapsed: boolean = false; 
  @Input() menuItems: MenuItem[] = [];

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }
  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  toggleMenu(item: MenuItem) {
    item.open = !item.open;
  }

  navigate(route?: string) {
    if (route) this.router.navigate([route]);
  }
  isCollapsed(): boolean {
    return this.collapsed;
  }
}
