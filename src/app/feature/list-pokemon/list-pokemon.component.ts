import { Component, OnInit } from '@angular/core';
import { PokemonService } from './../../service/pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  pokemonList = [];
  fullPokemonList = [];

  constructor(private pokemonService: PokemonService) { }

  async ngOnInit() {
    await this.pokemonService.getAllPokemon().toPromise()
      .then(result => this.pokemonList = result.results);

    this.pokemonList.forEach(pokemon => {
      this.pokemonService.getInfoPokemon(pokemon.url).toPromise()
        .then(result => {
          this.fullPokemonList.push({
            id: result.id,
            name: result.name,
            weight: result.weight,
            type1: result.types[0].type.name,
            type2: result.types[1] ? result.types[1].type.name : null,
            sprite: result.sprites.front_default
          });
        });
    });
    console.log(this.fullPokemonList);
  }

}
