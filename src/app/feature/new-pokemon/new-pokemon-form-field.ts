import { TextboxField} from './../../shared/components/form-generator/classes/textbox-field';
import { DropdownField } from './../../shared/components/form-generator/classes/dropdown-field';

export class NewPokemonFields {
  static registerPokemon(types) {
    return [
      new TextboxField({
        key: 'name',
        label: 'Nombre',
        required: true,
        order: 1
      }),

      new TextboxField({
        key: 'weight',
        label: 'Peso',
        type: 'number',
        required: true,
        order: 2
      }),

      new DropdownField({
        key: 'type',
        label: 'Tipo',
        options: types,
        required: true,
        order: 3
      })
    ];
  }
}
