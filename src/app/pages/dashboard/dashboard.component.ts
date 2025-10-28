import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PdfService, PdfItem } from '../../services/pdf.service';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy, OnInit {
  searchTerm = '';
  results: PdfItem[] = [];
  loading = false;
  error = '';
  private search$ = new Subject<string>();
  private sub: Subscription;

  constructor(
    private pdfService: PdfService,
    private auth: AuthService,
    private router: Router  // Proper dependency injection
  ) {
    // prints routing events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('🚀 Navigation started to:', event.url);
      }
      if (event instanceof NavigationEnd) {
        console.log('✅ Navigation ended at:', event.url);
      }
      if (event instanceof NavigationError) {
        console.error('❌ Navigation error:', event.error);
      }
    });

    // Handling live search
    this.sub = this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.loading = true;
        this.error = '';
        return this.pdfService.searchByRef(term);
      })
    ).subscribe({
      next: (items) => {
        this.results = items;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to fetch results';
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    console.log('✅ DashboardComponent initialized');
  }

  onNavClick(route: string) {
    console.log('🖱️ Click detected on:', route);
    this.router.navigate([`/${route}`]); // navigation
  }

  onSearchManual() {
    this.search$.next(this.searchTerm);
  }

  onSearch() {
    this.onSearchManual();
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
