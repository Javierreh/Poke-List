import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FilterPokemonFields as fpf } from './filter-pokemon-form-field';
import { FormFieldBase } from 'src/app/shared/components/form-generator/classes/form-field-base';
import { FormGroup } from '@angular/forms';
import { FormControlService } from 'src/app/shared/components/form-generator/form-control.service';
import { PokemonService } from './../../../service/pokemon.service';
import { PokemonFilter } from './../../../model/pokemon.interface';
import { fromEvent, merge } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filter-pokemon',
  templateUrl: './filter-pokemon.component.html',
  styleUrls: ['./filter-pokemon.component.scss']
})
export class FilterPokemonComponent implements OnInit, AfterViewInit {
  @Input() fields: FormFieldBase<string>[] = [];
  form: FormGroup;
  types: string[] = [];

  @Output() dataFilter: EventEmitter<any> = new EventEmitter<any>();

  filter: PokemonFilter = {
    name: null,
    weight: null,
    type: null
  };

  constructor(private fcs: FormControlService,
              private pokemonService: PokemonService) {
    this.types = this.pokemonService.getTypes();
  }

  ngOnInit() {
    this.fields = fpf.filterPokemon(this.types);
    this.form = this.fcs.toFormGroup(this.fields);
  }

  ngAfterViewInit() {
    this.emitFilter();
  }

  emitFilter() {
    const dataChanges = [
      fromEvent(document.getElementById('name'), 'keyup')
        .pipe(map(event => (event.target as HTMLInputElement).value), debounceTime(400), distinctUntilChanged()),
      fromEvent(document.getElementById('weight'), 'keyup')
        .pipe(map(event => (event.target as HTMLInputElement).value), debounceTime(400), distinctUntilChanged()),
      fromEvent(document.getElementById('type'), 'change')
        .pipe(map(event => (event.target as HTMLSelectElement).value), debounceTime(400), distinctUntilChanged()),
      ];
    merge(...dataChanges).pipe(
      map(() => {
        this.filter.name = this.form.value.name || null;
        this.filter.weight = this.form.value.weight || null;
        this.filter.type = this.form.value.type || null;
      })
    ).subscribe(() => {
      this.dataFilter.emit(this.filter);
    });
  }

  resetFilter() {
    this.filter = { name: null, weight: null, type: null };
    this.dataFilter.emit(this.filter);
  }
}
