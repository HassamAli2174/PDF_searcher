import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageLayoutComponent } from '../../shared/page-layout/page-layout.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search-ref',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    PageLayoutComponent,
],
  templateUrl: './search-ref.component.html',
  styleUrls: ['./search-ref.component.scss'],
})
export class SearchRefComponent {
  masterRef = '';
  eventRef = '';
  documents: any[] = [];
  displayedColumns: string[] = ['docid', 'filename', 'documentType', 'description', 'docdoccat',
    'doctype'];
  loading = false;
  searched = false;
  // useDummyData = true; // switch to false when API is ready

  // dummyDocuments = [
  //   {
  //     filename: 'Software Request Form.pdf',
  //     documentType: 'application/pdf',
  //     tnxreference: 'ILC/MBW/11/0004',
  //     eventreference: 'ISS001',
  //     description: 'Bill of exchange',
  //     docid: 'DOC-001',
  //     docdoccat: 'Attachment',
  //     doctype: 'BOE-Bill of exchange'
  //   },
  //   {
  //     filename: 'Commercial Invoice.pdf',
  //     documentType: 'application/pdf',
  //     tnxreference: 'ILC/MBW/11/0004',
  //     eventreference: 'ISS001',
  //     description: 'Commercial invoice',
  //     docid: 'DOC-002',
  //     docdoccat: 'Attachment',
  //     doctype: 'COI-Commercial invoice'
  //   },
  //   {
  //     filename: 'Acknowledgement.pdf',
  //     documentType: 'application/pdf',
  //     tnxreference: 'ILC/MBW/11/0004',
  //     eventreference: 'ISS001',
  //     description: 'ACKNOWLEDGEMENT TO APPLICANT',
  //     docid: 'DOC-003',
  //     docdoccat: 'Generated',
  //     doctype: 'Internal'
  //   }
  // ];

  
  constructor(private api: ApiService) { }

  //when using api service use this function
  onSearch() {
    if (!this.masterRef || !this.eventRef) {
      alert('Please enter both Master Reference and Event Reference');
      return;
    }

    this.loading = true;
    this.searched = true;
    this.documents = [];

    this.api.getDocumentsByRef(this.masterRef, this.eventRef).subscribe({
      next: (res) => {
        this.documents = res;
        console.log('✅ Documents fetched:', res);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ API error:', err);
        this.loading = false;
      }
    });
  }


  // For testing with dummy data
  // onSearch() {
  //   if (!this.masterRef || !this.eventRef) {
  //     alert('Please enter both Master Reference and Event Reference');
  //     return;
  //   }

  //   this.loading = true;
  //   this.searched = true;
  //   this.documents = [];

  //   if (this.useDummyData) {
  //     setTimeout(() => {
  //       this.documents = this.dummyDocuments;
  //       this.loading = false;
  //       console.log('🧪 Dummy documents loaded:', this.documents);
  //     }, 600); // simulate API delay
  //     return;
  //   }

  //   // 🔴 Real API call
  //   this.api.getDocumentsByRef(this.masterRef, this.eventRef).subscribe({
  //     next: (res) => {
  //       this.documents = res;
  //       this.loading = false;
  //     },
  //     error: () => {
  //       this.loading = false;
  //     }
  //   });
  // }



  // For downloading/opening document - currently not used

  // openDocument(docid: string) {
  //   this.api.searchDocument(docid).subscribe({
  //     next: (blob) => {
  //       const fileURL = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = fileURL;
  //       a.download = docid; // you can replace with filename
  //       a.click();
  //       window.URL.revokeObjectURL(fileURL);
  //     },
  //     error: (err) => {
  //       console.error('❌ Error downloading document:', err);
  //     }
  //   });
  // }


  openDocument(docId: string) {
    this.api.searchDocument(docId).subscribe({
      next: (blob) => {
        const fileType = blob.type || 'unknown';
        console.log('📥 File received:', fileType);

        if (fileType.startsWith('image/')) {
          this.previewImage(blob);
        }
        else if (fileType === 'application/pdf') {
          this.previewPdf(blob);
        }
        else if (fileType.includes('spreadsheet') || fileType.includes('excel')) {
          this.downloadExcel(blob);
        }
        else {
          alert('Unknown file type: ' + fileType);
        }
      },
      error: (err) => {
        console.error('❌ Error fetching file:', err);
        alert('Failed to load document.');
      }
    });
  }

  previewImage(blob: Blob) {
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }


  previewPdf(blob: Blob) {
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }


  downloadExcel(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "document.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  }




}
