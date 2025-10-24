import { Component, OnDestroy } from '@angular/core';
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
export class DashboardComponent implements OnDestroy {
  searchTerm = '';
  results: PdfItem[] = [];
  loading = false;
  error = '';
  private search$ = new Subject<string>();
  private sub: Subscription;

  constructor(private pdfService: PdfService, private auth: AuthService) {
    // Debounce user input (300ms) and switch to latest search
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

  onSearchManual() {
    // called on Enter key or Search button — pushes value to the debounced stream
    this.search$.next(this.searchTerm);
  }

  onSearch() {
    // alias for buttons that trigger immediate search
    this.onSearchManual();
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
