import { Component, OnInit, Input } from '@angular/core';
import { NewPokemonFields as npf } from './new-pokemon-form-field';
import { FormFieldBase } from './../../shared/components/form-generator/classes/form-field-base';
import { FormGroup } from '@angular/forms';
import { FormControlService } from './../../shared/components/form-generator/form-control.service';
import { NewPokemonService } from './../../service/new-pokemon.service';
import { UtilsService, Pokemon } from './../../service/utils.service';

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
              private newPokemonService: NewPokemonService,
              private utils: UtilsService) {
    this.types = this.utils.getTypes();
  }

  ngOnInit() {
    this.fields = npf.registerPokemon(this.types);
    this.form = this.fcs.toFormGroup(this.fields);
  }

  onSubmit() {
    this.newPokemonService.insertNewPokemon(this.getRequestNewPokemon())
      .then(data => {
        console.log('OK!!');
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
    this.form.reset();
  }

  getRequestNewPokemon(): Pokemon {
    const request: Pokemon = {
      name: this.form.value.name,
      weight: Number(this.form.value.weight),
      type: this.form.value.type
    };
    return request;
  }
}
