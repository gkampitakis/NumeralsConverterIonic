import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const serverUri = 'https://roman-arabic-converter.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class ConversionServiceService {
  constructor(private http: HttpClient) {}

  getArabic(value: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http
        .get(serverUri + 'arabic/' + value)
        .toPromise()
        .then((res: any) => resolve(res.convertedValue)) //FIXME:
        .catch(err => reject(err));
    });
  }

  getRoman(value: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http
        .get(serverUri + 'roman/' + value)
        .toPromise()
        .then((res: any) => {
          resolve(res.convertedValue);
        }) //FIXME:
        .catch(err => {
          reject(err);
        });
    });
  }
}
