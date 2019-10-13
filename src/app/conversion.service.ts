import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  constructor(private http: HttpClient) {}

  getArabic(value: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.serverUri + 'arabic/' + value)
        .toPromise()
        .then((res: any) => resolve(res.convertedValue))
        .catch(err => reject(err));
    });
  }

  getRoman(value: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.serverUri + 'roman/' + value)
        .toPromise()
        .then((res: any) => resolve(res.convertedValue))
        .catch(err => reject(err));
    });
  }

  retrieveAll(query: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.serverUri + 'all/' + query)
        .toPromise()
        .then((res: any) => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  }

  removeAll(): Promise<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http
        .delete(environment.serverUri + 'remove/all', { headers: headers })
        .toPromise()
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }
}
