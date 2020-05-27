import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as AppContext } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewPokemonService {

  private newPokemonUrl: string;

  constructor(private http: HttpClient) {
    this.newPokemonUrl = AppContext.context + 'pokemon';
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }

  private getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  insertNewPokemon(newPokemon: Pokemon): Promise<any> {
    return this.http
    .post(
      this.newPokemonUrl,
      JSON.stringify(newPokemon),
      this.getHttpOptions())
    .toPromise()
      .then(data => data)
      .catch(error => this.handleError(error));
  }

  getTypes() {
    return this.http.get('https://pokeapi.co/api/v2/type');
  }

}

export interface Pokemon {
  name: string;
  weight: number;
  type: string;
}
