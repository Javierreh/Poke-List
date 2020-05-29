import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as AppContext } from './../../environments/environment';
import { Pokemon } from '../model/pokemon.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private newPokemonUrl: string;
  private listPokemonUrl: string;

  constructor(private http: HttpClient) {
    this.newPokemonUrl = AppContext.context + 'pokemon';
    this.listPokemonUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }

  private handleErrorObservable = (error: Response) => {
    return throwError(error);
  }

  private getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  insertNewPokemon(newPokemon: Pokemon): Promise<Pokemon> {
    return this.http
    .post(
      this.newPokemonUrl,
      JSON.stringify(newPokemon),
      this.getHttpOptions())
    .toPromise()
      .then(data => data)
      .catch(error => this.handleError(error));
  }

  getAllPokemon(): Observable<any> {
    return this.http
    .get<Pokemon>(this.listPokemonUrl)
    .pipe(catchError(error => this.handleErrorObservable(error)));
  }

  getInfoPokemon(url: string): Observable<any> {
    return this.http
    .get<Pokemon>(url)
    .pipe(catchError(error => this.handleErrorObservable(error)));
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
