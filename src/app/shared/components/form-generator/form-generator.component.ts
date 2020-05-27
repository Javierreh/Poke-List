import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormFieldBase } from './classes/form-field-base';


@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit {

  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get isValid() { return this.form.controls[this.field.key].valid; }
}
