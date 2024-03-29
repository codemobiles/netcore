import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TestJSON } from '../models/test.model';
import { ResponseProducts, ResponseProduct, Product } from '../models/product.model';
import { ResponseLogin, ResponseRegister } from '../models/auth.model';


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
  public productImageURL = `${this.apiURL}/product/images`;
  private outOfStockURL = `${this.productURL}/count/out_of_stock`;
  private transactionURL = `${this.apiURL}/transaction`;

  constructor(private httpClient: HttpClient) { }

  getTest(): Observable<TestJSON[]>{
    return this.httpClient.get<TestJSON[]>(`users`);
  }

  login(data): Observable<ResponseLogin>{
    return this.httpClient.post<ResponseLogin>(this.loginURL, data);
  }

  isLogin(): Boolean{
    var token = localStorage.getItem(environment.keyLocalAuthenInfo)
    return token != null
  }

  register(data): Observable<ResponseRegister>{
    return this.httpClient.post<ResponseRegister>(this.registerURL, data);
  }

  getProductAll(): Observable<ResponseProducts>{
    return this.httpClient.get<ResponseProducts>(this.productURL);
  }

  deleteProduct(id: Number): Observable<ResponseProduct>{
    return this.httpClient.delete<ResponseProduct>(`${this.productURL}/${id}`);
  }

  addProduct(data): Observable<ResponseProduct>{
    return this.httpClient.post<ResponseProduct>(this.productURL, this.makeFormData(data));
  }

  makeFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('stock', product.stock.toString());
    formData.append('upload_file', product.image);
    return formData;
  }

  getProduct(id: Number): Observable<ResponseProduct>{
    return this.httpClient.get<ResponseProduct>(`${this.productURL}/${id}`);
  }

  editProduct(data, id: Number): Observable<ResponseProduct>{
    return this.httpClient.put<ResponseProduct>(
      `${this.productURL}/${id}`, this.makeFormData(data));
  }

}
