import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as AppContext } from './../../environments/environment';
import { UtilsService, Pokemon } from './utils.service';


@Injectable({
  providedIn: 'root'
})
export class NewPokemonService {

  private newPokemonUrl: string;

  constructor(private utils: UtilsService, private http: HttpClient) {
    this.newPokemonUrl = AppContext.context + 'pokemon';
  }

  insertNewPokemon(newPokemon: Pokemon): Promise<any> {
    return this.http
    .post(
      this.newPokemonUrl,
      JSON.stringify(newPokemon),
      this.utils.getHttpOptions())
    .toPromise()
      .then(data => data)
      .catch(error => this.utils.handleError(error));
  }
}
