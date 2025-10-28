// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { PageLayoutComponent } from '../../shared/page-layout/page-layout.component';
// import { ApiService } from '../../services/api.service';
// import { MatIcon } from "@angular/material/icon";

// @Component({
//   selector: 'app-search-doc',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatInputModule,
//     MatButtonModule,
//     MatCardModule,
//     MatProgressSpinnerModule,
//     PageLayoutComponent,
//     MatIcon
// ],
//   templateUrl: './search-doc.component.html',
//   styleUrls: ['./search-doc.component.scss'],
// })
// export class SearchDocComponent {
  
//     searchTerm = '';
//     loading = false;
//     resultMessage = '';
  
//     constructor(private api: ApiService) { }
  
//     ngOnInit(): void {
//       console.log('✅ Search Doc loaded');
//     }
  
//     onSearch() {
//       if (!this.searchTerm.trim()) {
//         alert('Please enter a valid Document ID');
//         return;
//       }
  
//       this.loading = true;
//       this.resultMessage = '';
  
//       this.api.searchDocument(this.searchTerm).subscribe({
//         next: (blob) => {
//           this.loading = false;
//           const fileType = blob.type || 'unknown';
//           console.log('📦 Received file type:', fileType);
  
//           if (fileType.startsWith('image/')) {
//             this.openImagePreview(blob);
//             this.resultMessage = '🖼️ Image opened successfully.';
//           } else if (fileType === 'application/pdf') {
//             this.openPdf(blob);
//             this.resultMessage = '📄 PDF opened successfully.';
//           } else if (fileType.includes('spreadsheet') || fileType.includes('excel')) {
//             this.downloadExcel(blob);
//             this.resultMessage = '📊 Excel downloaded successfully.';
//           } else {
//             this.resultMessage = `⚠️ Unknown file type: ${fileType}`;
//           }
//         },
//         error: (err) => {
//           this.loading = false;
//           console.error('❌ Error fetching document:', err);
//           this.resultMessage = '❌ Failed to fetch document. Please check the ID.';
//         }
//       });
//     }
  
//     openImagePreview(blob: Blob) {
//       const imgUrl = URL.createObjectURL(blob);
//       const win = window.open('', '_blank');
//       win!.document.write(`
//         <html>
//           <head>
//             <title>Image Preview</title>
//             <style>
//               body {
//                 margin: 0;
//                 background: #000;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 height: 100vh;
//               }
//               img {
//                 max-width: 95%;
//                 max-height: 95%;
//                 border-radius: 12px;
//                 box-shadow: 0 0 25px rgba(255,255,255,0.3);
//                 animation: zoomIn 0.5s ease;
//               }
//               @keyframes zoomIn {
//                 from { transform: scale(0.8); opacity: 0; }
//                 to { transform: scale(1); opacity: 1; }
//               }
//             </style>
//           </head>
//           <body>
//             <img src="${imgUrl}" />
//           </body>
//         </html>
//       `);
//     }
  
//     openPdf(blob: Blob) {
//       const pdfUrl = URL.createObjectURL(blob);
//       window.open(pdfUrl, '_blank');
//     }
  
//     downloadExcel(blob: Blob) {
//       const a = document.createElement('a');
//       const url = URL.createObjectURL(blob);
//       a.href = url;
//       a.download = 'document.xlsx';
//       a.click();
//       URL.revokeObjectURL(url);
//     }
// }



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageLayoutComponent } from '../../shared/page-layout/page-layout.component';
import { ApiService } from '../../services/api.service';
import { MatIcon } from "@angular/material/icon";

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
    PageLayoutComponent,
    MatIcon
  ],
  templateUrl: './search-doc.component.html',
  styleUrls: ['./search-doc.component.scss'],
})
export class SearchDocComponent {
  searchTerm = '';
  loading = false;
  resultMessage = '';

  constructor(private api: ApiService) { }

  onSearch() {
    if (!this.searchTerm.trim()) {
      alert('Please enter a valid Document ID');
      return;
    }

    this.loading = true;
    this.resultMessage = '';

    this.api.searchDocument(this.searchTerm).subscribe({
      next: (blob) => {
        this.loading = false;
        const fileType = blob.type || 'unknown';
        console.log('📦 Received file type:', fileType);

        if (fileType.startsWith('image/')) {
          this.openImagePreview(blob);
          this.resultMessage = '🖼️ Image opened successfully.';
        } else if (fileType === 'application/pdf') {
          this.openPdf(blob);
          this.resultMessage = '📄 PDF opened successfully.';
        } else if (fileType.includes('spreadsheet') || fileType.includes('excel')) {
          this.downloadExcel(blob);
          this.resultMessage = '📊 Excel downloaded successfully.';
        } else {
          this.resultMessage = `⚠️ Unknown file type: ${fileType}`;
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Error fetching document:', err);
        this.resultMessage = '❌ Failed to fetch document. Please check the ID.';
      }
    });
  }

  openImagePreview(blob: Blob) {
    const imgUrl = URL.createObjectURL(blob);
    const win = window.open('', '_blank');
    win!.document.write(`
      <html>
        <head>
          <title>Image Preview</title>
          <style>
            body {
              margin: 0;
              background: #000;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            img {
              max-width: 95%;
              max-height: 95%;
              border-radius: 12px;
              box-shadow: 0 0 25px rgba(255,255,255,0.3);
              animation: zoomIn 0.5s ease;
            }
            @keyframes zoomIn {
              from { transform: scale(0.8); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          </style>
        </head>
        <body>
          <img src="${imgUrl}" />
        </body>
      </html>
    `);
  }

  openPdf(blob: Blob) {
    const pdfUrl = URL.createObjectURL(blob);
    window.open(pdfUrl, '_blank');
  }

  downloadExcel(blob: Blob) {
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = 'document.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  }
}

