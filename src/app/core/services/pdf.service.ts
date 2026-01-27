import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface PdfItem {
  id: string;
  reference: string;
  title: string;
  url: string;
  uploadedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  // will replace with real API base
  private apiUrl = 'https://example.com/api/pdfs';

  // mock data for testing (used if API not available)
  private mock: PdfItem[] = [
    { id: '1', reference: 'REF-1001', title: 'Invoice - REF-1001', url: '/assets/sample.pdf', uploadedAt: '2025-01-20' },
    { id: '2', reference: 'REF-1002', title: 'Report - REF-1002', url: '/assets/sample.pdf', uploadedAt: '2025-02-15' },
    { id: '3', reference: 'REF-1030', title: 'Contract - REF-1030', url: '/assets/sample.pdf', uploadedAt: '2025-03-03' }
  ];

  constructor(private http: HttpClient) {}

  /**
   * Search PDFs by reference number (server preferred).
   * If your API exists, it should accept a query param like ?ref=REF-1001.
   * If request fails or apiUrl is not configured, fallback to client-side mock filter.
   */
  searchByRef(ref: string): Observable<PdfItem[]> {
    if (!ref || !ref.trim()) {
      return of([]);
    }

    // Try server call first
    const params = new HttpParams().set('ref', ref.trim());

    return this.http.get<{ data: PdfItem[] }>(this.apiUrl, { params }).pipe(
      map(resp => resp?.data ?? []),
      catchError(() => {
        // fallback to mock filter (case-insensitive contains)
        const q = ref.trim().toLowerCase();
        const results = this.mock.filter(p => p.reference.toLowerCase().includes(q) || p.title.toLowerCase().includes(q));
        return of(results);
      })
    );
  }
}
