import { Component, OnInit, Input } from '@angular/core';
import { FilterPokemonFields as fpf } from './filter-pokemon-form-field';
import { FormFieldBase } from 'src/app/shared/components/form-generator/classes/form-field-base';
import { FormGroup } from '@angular/forms';
import { FormControlService } from 'src/app/shared/components/form-generator/form-control.service';
import { PokemonService } from './../../../service/pokemon.service';

@Component({
  selector: 'app-filter-pokemon',
  templateUrl: './filter-pokemon.component.html',
  styleUrls: ['./filter-pokemon.component.scss']
})
export class FilterPokemonComponent implements OnInit {
  @Input() fields: FormFieldBase<string>[] = [];
  form: FormGroup;
  types: string[] = [];

  constructor(private fcs: FormControlService,
              private pokemonService: PokemonService) {
    this.types = this.pokemonService.getTypes();
  }

  ngOnInit() {
    this.fields = fpf.filterPokemon(this.types);
    this.form = this.fcs.toFormGroup(this.fields);
  }
}
