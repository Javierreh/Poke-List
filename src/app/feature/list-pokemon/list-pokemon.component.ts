import { Component, OnInit } from '@angular/core';
import { PokemonService } from './../../service/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon.interface';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  loaded = false;

  pokemonList = [];
  fullPokemonList: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  async ngOnInit() {
    // Get all pokemon in list
    this.pokemonList = await this.pokemonService.getAllPokemon().toPromise()
      .then(result =>  result.results);

    // Get information of each pokemon and order desc
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
          this.sortArrayByField(this.fullPokemonList, 'id');
        });
    });
    this.filteredPokemon = this.fullPokemonList;
  }

  sortArrayByField(array, field) {
    return array.sort((a, b) => b[field] - a[field]);
  }

  getFilter(dataFilter) {
    let filtered = this.fullPokemonList;

    if (dataFilter && dataFilter.name) {
      filtered = filtered.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(dataFilter.name.toLowerCase())
      });
    }
    if (dataFilter && dataFilter.weight) {
      filtered = filtered.filter(pokemon => {
        return Math.floor(pokemon.weight / 10) === parseInt(dataFilter.weight, 10);
      });
    }
    if (dataFilter && dataFilter.type) {
      filtered = filtered.filter(pokemon => {
        return  pokemon.type1 === dataFilter.type ||
                pokemon.type2 === dataFilter.type;
      });
    }
    this.filteredPokemon = filtered;
  }
}
