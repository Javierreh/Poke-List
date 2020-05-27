import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormFieldBase } from './classes/form-field-base';

@Injectable()
export class FormControlService {
  constructor() { }

  toFormGroup(fields: FormFieldBase<string>[] ) {
    const group: any = {};

    fields.forEach(field => {
      group[field.key] = field.required ? new FormControl(field.value || '', Validators.required)
                                              : new FormControl(field.value || '');
    });
    return new FormGroup(group);
  }
}
