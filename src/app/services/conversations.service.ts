import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {
  private readonly token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1Y2F2aXphNkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NGY4ZTA5OGFiMzUzMzg1MDM0NmVkYzkiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTQyMTEwNDksImV4cCI6MTY5NDIxNDY0OX0.Z9tQRu64Oq40yrKeSJ7B_KsHkm0LnF7o_6Db0tlVrkk';
  private readonly url!: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'conversations/';
  }

  getConversaciones(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<any[]>(this.url, { headers: headers });
  }

}
