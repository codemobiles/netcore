import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TestJSON } from '../models/test.model';
import { ResponseProducts } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class NetworkServiceService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private hostURL = environment.baseAPIURL;
  private apiURL = `${this.hostURL}/api/v2`;
  // -----------------------------------------------------
  private loginURL = `${this.apiURL}/auth/login`;
  private registerURL = `${this.apiURL}/auth/register`;
  private productURL = `${this.apiURL}/product`;
  private productImageURL = `${this.apiURL}/product/images`;
  private outOfStockURL = `${this.productURL}/count/out_of_stock`;
  private transactionURL = `${this.apiURL}/transaction`;

  constructor(private httpClient: HttpClient) { }

  getTest(): Observable<TestJSON[]>{
    return this.httpClient.get<TestJSON[]>(`users`);
  }

  login(data): Observable<any>{
    return this.httpClient.post<any>(this.loginURL, data);
  }

  register(data): Observable<any>{
    return this.httpClient.post<any>(this.registerURL, data);
  }

  getProductAll(): Observable<ResponseProducts>{
    return this.httpClient.get<ResponseProducts>(this.productURL);
  }
}
