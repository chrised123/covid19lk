import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {
    constructor(private http: HttpClient) {}

    fetch() {
        return this.http.get(`//hpb.health.gov.lk/api/get-current-statistical`);
    }
}
