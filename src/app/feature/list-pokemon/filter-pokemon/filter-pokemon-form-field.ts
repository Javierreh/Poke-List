import { TextboxField} from './../../../shared/components/form-generator/classes/textbox-field';
import { DropdownField } from './../../../shared/components/form-generator/classes/dropdown-field';

export class FilterPokemonFields {
  static filterPokemon(types) {
    return [
      new TextboxField({
        key: 'name',
        label: 'Nombre',
        required: false,
        order: 1
      }),

      new TextboxField({
        key: 'weight',
        label: 'Peso (Kg)',
        type: 'number',
        required: false,
        order: 2
      }),

      new DropdownField({
        key: 'type',
        label: 'Tipo',
        options: types,
        required: false,
        order: 3
      })
    ];
  }
}
