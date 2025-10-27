import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  template: `
<div class="layout">
    <mat-toolbar color="primary" class="toolbar">
        <button mat-icon-button (click)="goBack()" *ngIf="showBack">
            <mat-icon>arrow_back</mat-icon>
        </button>
        <span class="toolbar-title">{{ title }}</span>
    </mat-toolbar>
    <div class="content">
        <ng-content></ng-content>
    </div>
</div>
`,
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent {
  @Input() title = '';
  @Input() showBack = true;

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}