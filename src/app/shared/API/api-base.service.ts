import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {

  readonly  apiUrl = 'http://localhost:9000/api/';

  constructor(public http: HttpClient) { }

  post( url: string, data: any): Observable<any> {
    const link = this.apiUrl + url;
    return  this.http.post( link, data );
  }

  get( url: string ): Observable<any> {
    const link = this.apiUrl + url;
    return  this.http.get( link );
  }

  delete( url: string, data: any ): Observable<any> {
    const link = this.apiUrl + url;
    return this.http.delete( link, data );
  }

  put( url: string, data: any ): Observable<any> {
    const link = this.apiUrl + url;
    return this.http.put( link, data );
  }

}
