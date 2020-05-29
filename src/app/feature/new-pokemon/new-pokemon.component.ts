import { Component, OnInit, Input } from '@angular/core';
import { NewPokemonFields as npf } from './new-pokemon-form-field';
import { FormFieldBase } from './../../shared/components/form-generator/classes/form-field-base';
import { FormGroup } from '@angular/forms';
import { FormControlService } from './../../shared/components/form-generator/form-control.service';
import { PokemonService } from './../../service/pokemon.service';
import { Pokemon } from './../../model/pokemon.interface';

@Component({
  selector: 'app-new-pokemon',
  templateUrl: './new-pokemon.component.html',
  styleUrls: ['./new-pokemon.component.scss']
})
export class NewPokemonComponent implements OnInit {
  @Input() fields: FormFieldBase<string>[] = [];
  form: FormGroup;
  types: string[] = [];

  constructor(private fcs: FormControlService,
              private pokemonService: PokemonService) {
    this.types = this.pokemonService.getTypes();
  }

  ngOnInit() {
    this.fields = npf.registerPokemon(this.types);
    this.form = this.fcs.toFormGroup(this.fields);
  }

  onSubmit() {
    this.pokemonService.insertNewPokemon(this.getRequestNewPokemon())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
    this.form.reset();
  }

  getRequestNewPokemon(): Pokemon {
    const request: Pokemon = {
      id: null,
      name: this.form.value.name,
      weight: Number(this.form.value.weight),
      type1: this.form.value.type,
      type2: null,
      sprite: null
    };
    return request;
  }
}
