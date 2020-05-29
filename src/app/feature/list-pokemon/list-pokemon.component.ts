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
    // Get all pokemon in list
    this.pokemonList = await this.pokemonService.getAllPokemon().toPromise()
      .then(result =>  result.results);

    // Get information of each pokemon and order desc
    for (let i = this.pokemonList.length - 1; i >= 0; i--) {
      await this.pokemonService.getInfoPokemon(this.pokemonList[i].url).toPromise()
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
    }
    this.sortArrayById(this.fullPokemonList);
  }

  sortArrayById(array) {
    return array.sort((a, b) => b.id - a.id);
  }
}
