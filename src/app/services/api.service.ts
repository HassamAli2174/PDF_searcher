import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl; // coming from environment file

  constructor(private http: HttpClient) { }


//################# for dummy data checking###############
  // searchDocumentssss(documentId: string): Observable<Blob> {
  //   // 🧪 Dummy logic: Choose based on ID
  //   let fileType = '';
  //   let fileUrl = '';

  //   if (documentId.endsWith('img')) {
  //     fileUrl = 'https://picsum.photos/600/400'; // Random image
  //     fileType = 'image/jpeg';
  //   } else if (documentId.endsWith('pdf')) {
  //     fileUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  //     fileType = 'application/pdf';
  //   } else if (documentId.endsWith('xls')) {
  //     fileUrl = 'https://file-examples.com/storage/fe96e32a70bda5e0fef4a68/2017/02/file_example_XLS_10.xls';
  //     fileType = 'application/vnd.ms-excel';
  //   } else {
  //     fileUrl = 'https://picsum.photos/600/400';
  //     fileType = 'image/jpeg';
  //   }

  //   // Fetch the file as Blob
  //   return new Observable((observer) => {
  //     fetch(fileUrl)
  //       .then((res) => res.blob())
  //       .then((blob) => observer.next(blob))
  //       .catch((err) => observer.error(err));
  //   });
  // }
  searchDocument(documentId: string): Observable<Blob> {
    const url = `${this.baseUrl}mydms/searchdocument/${documentId}`;
    console.log('🌐 Fetching from:', url);
    return this.http.get(url, { responseType: 'blob' });
  }
//################# for dummy data checking###############




  // searchDocument(documentId: string): Observable<any> {
  //   const url = `${this.baseUrl}mydms/searchdocument/${documentId}`;
  //   return this.http.get(url);
  // }

  //  Send POST data
  postData(endpoint: string, data: any): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post(url, data);
  }

  //  Get data
  getData(endpoint: string): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get(url);
  }

  // Send data with Authorization header
  postWithToken(endpoint: string, data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, { headers });
  }
}
