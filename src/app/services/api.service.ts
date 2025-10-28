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

  searchDocument(documentId: string): Observable<any> {
    const url = `${this.baseUrl}mydms/searchdocument/${documentId}`;
    return this.http.get(url);
  }

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
