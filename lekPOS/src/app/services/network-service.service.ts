import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TestJSON } from '../models/test.model';


@Injectable({
  providedIn: 'root'
})
export class NetworkServiceService {

  baseURL = environment.baseAPIURL;

  constructor(private httpClient: HttpClient) { }

  getTest(): Observable<TestJSON[]>{
    return this.httpClient.get<TestJSON[]>(`${this.baseURL}/users`);
  }
}
