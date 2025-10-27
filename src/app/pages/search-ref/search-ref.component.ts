import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageLayoutComponent } from '../../shared/page-layout/page-layout.component';

@Component({
  selector: 'app-search-ref',
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
  templateUrl: './search-ref.component.html',
  styleUrls: ['./search-ref.component.scss'],
})
export class SearchRefComponent {
  refId = '';
  loading = false;
  result: any = null;

  onSearch() {
    if (!this.refId.trim()) return;
    this.loading = true;

    setTimeout(() => {
      this.result = {
        refId: this.refId,
        accountHolder: 'Hassam Arshad',
        bank: 'MCB Bank Ltd.',
        amount: '₨ 500,000',
        status: 'Approved',
      };
      this.loading = false;
    }, 1000);
  }
}
