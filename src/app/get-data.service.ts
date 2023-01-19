import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  url = '/assets/reservations.json';

  constructor( private http: HttpClient) { }

  getJsonData() {
    return this.http.get(this.url);
  }
}
