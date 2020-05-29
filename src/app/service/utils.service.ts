import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }

  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  getTypes() {
    const arrayTypes = [];
    this.http.get('https://pokeapi.co/api/v2/type')
      .subscribe(result => {
        result['results'].forEach(type => {
          arrayTypes.push(type['name']);
        });
    });
    return arrayTypes;
  }
}

export interface Pokemon {
  name: string;
  weight: number;
  type: string;
}
