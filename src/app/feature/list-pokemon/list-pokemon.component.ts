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
  filter = null;

  apiPokemonList = [];
  customPokemonList: Pokemon[] = [];
  fullPokemonList: Pokemon[] = [];
  filteredPokemonList: Pokemon[] = [];
  paginatedPokemonList: any = [];

  constructor(private pokemonService: PokemonService) { }

  async ngOnInit() {

    // Get all custom Pokemon (from local json server)
    this.pokemonService.getAllCustomPokemon().subscribe(result => {
      this.fullPokemonList.push(...result);
    });

    // Get all pokemon in list (from API)
    this.apiPokemonList = await this.pokemonService.getAllPokemon().toPromise()
      .then(result =>  result.results);

    // Get information of each pokemon and order desc (from API)
    this.apiPokemonList.forEach(pokemon => {
      this.pokemonService.getInfoPokemon(pokemon.url).toPromise()
        .then(result => {
          const apiPokemon = {
            id: result.id,
            name: result.name,
            weight: result.weight,
            type1: result.types[0].type.name,
            type2: result.types[1] ? result.types[1].type.name : null,
            image: result.sprites.front_default
          };
          this.fullPokemonList.push(apiPokemon);
          this.paginatedPokemonList = this.pagination(this.fullPokemonList, 1, 10);
        });
    });

  }

  getFilter(dataFilter) {
    this.filter = dataFilter;
    this.filteredPokemonList = this.fullPokemonList;

    if (dataFilter && dataFilter.name) {
      this.filteredPokemonList = this.filteredPokemonList.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(dataFilter.name.toLowerCase());
      });
    }
    if (dataFilter && dataFilter.weight) {
      this.filteredPokemonList = this.filteredPokemonList.filter(pokemon => {
        return Math.floor(pokemon.weight / 10) === parseInt(dataFilter.weight, 10);
      });
    }
    if (dataFilter && dataFilter.type) {
      this.filteredPokemonList = this.filteredPokemonList.filter(pokemon => {
        return  pokemon.type1 === dataFilter.type ||
                pokemon.type2 === dataFilter.type;
      });
    }
    this.paginatedPokemonList = this.pagination(this.filteredPokemonList, 1, 10);
  }


  pagination(pItems: Pokemon[], pPage: number, pPerPage: number) {
    const page = pPage || 1,
    perPage = pPerPage || 10,
    offset = (page - 1) * perPage,
    paginatedItems = pItems.sort((a, b) => b.id - a.id).slice(offset).slice(0, perPage),
    totalPages = Math.ceil(pItems.length / perPage);
    return {
      page: page,
      perPage: perPage,
      prevPage: page - 1 ? page - 1 : null,
      nextPage: (totalPages > page) ? page + 1 : null,
      total: pItems.length,
      totalPages: totalPages,
      data: paginatedItems
    };
  }

  nextPage(pNextPage: number, pPerPage: number) {
    if (pNextPage !== null) {
      this.getFilter(this.filter);
      this.paginatedPokemonList = this.pagination(this.filteredPokemonList, pNextPage, pPerPage);
    }
  }

  prevPage(pPrevPage: number, pPerPage: number) {
    if (pPrevPage !== null) {
      this.paginatedPokemonList = this.pagination(this.filteredPokemonList, pPrevPage, pPerPage);
    }
  }
}
