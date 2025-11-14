import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private baseUrl = environment.apiUrl; // coming from environment file
  private baseUrl = environment.apiUrl.replace(/\/$/, '');

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
  //################# for dummy data checking###############
  searchDocument(documentId: string): Observable<Blob> {
    const url = `${this.baseUrl}/mydms/searchdocument/${documentId}`;
    console.log('Fetching from:', url);
    return this.http.get(url, { responseType: 'blob' });
  }

  getDocumentsByRef(tnxreference: string, eventreference: string) {
    const endpoint = `mydms/listdocumentsbyref?tnxreference=${tnxreference}&eventreference=${eventreference}`;
    const url = this.buildUrl(endpoint);
    console.log('GET Documents →', url);
    return this.http.get<any[]>(url);
  }




  // Unified method to build endpoint URLs safely
  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint.replace(/^\/+/, '')}`;
  }


  //############### 🔹 Example: Fetch document (returns Blob)######################
  // searchDocument(documentId: string): Observable<any> {
  //   const url = `${this.baseUrl}mydms/searchdocument/${documentId}`;
  //   return this.http.get(url);
  // }
  

  // searchDocument(documentId: string): Observable<Blob> {
  //   const url = this.buildUrl(`mydms/searchdocument/${documentId}`);
  //   console.log('📄 Fetching Document →', url);
  //   return this.http.get(url, { responseType: 'blob' });
  // }
// ##########################################################




  //  Send POST data
  postData(endpoint: string, data: any): Observable<any> {
    // const url = `${this.baseUrl}/${endpoint}`;
    const url = this.buildUrl(endpoint);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('📤 POST →', url, '📦', data);
    return this.http.post(url, data, {headers});
  }

  //  Get data
  getData(endpoint: string): Observable<any> {
    // const url = `${this.baseUrl}/${endpoint}`;
    const url = this.buildUrl(endpoint);
    console.log('📥 GET →', url);
    return this.http.get(url);
  }

  // Send data with Authorization header
  // postWithToken(endpoint: string, data: any, token: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.post(`${this.baseUrl}/${endpoint}`, data, { headers });
  // }
  postWithToken(endpoint: string, data: any,): Observable<any> {
    const auth = inject(AuthService);
    const token = auth.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const url = this.buildUrl(endpoint);
    console.log('🔒 POST with Token →', url, '📦', data);
    return this.http.post(url, data, { headers });
  }
}
