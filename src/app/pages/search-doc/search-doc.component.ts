import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageLayoutComponent } from '../../shared/page-layout/page-layout.component';

@Component({
  selector: 'app-search-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    PageLayoutComponent
  ],
  templateUrl: './search-doc.component.html',
  styleUrls: ['./search-doc.component.scss'],
})
export class SearchDocComponent {
  docId = '';
  loading = false;
  result: any = null;

  onSearch() {
    if (!this.docId.trim()) return;
    this.loading = true;

    setTimeout(() => {
      this.result = {
        docId: this.docId,
        title: 'Client Onboarding Form',
        uploadedBy: 'Muhammad Ali',
        uploadedOn: '2025-10-20',
        status: 'Verified ✅',
      };
      this.loading = false;
    }, 1000);
  }
}
