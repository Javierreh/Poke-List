import { FormFieldBase } from './form-field-base';

export class TextboxField extends FormFieldBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
