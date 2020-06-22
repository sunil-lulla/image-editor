import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getImages(params) {
    return this.http.get(environment.getImageURL, {
      headers: {},
    });
  }
}
