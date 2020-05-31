import { Component, OnInit, Input } from '@angular/core';
import { NewPokemonFields as npf } from './new-pokemon-form-field';
import { FormFieldBase } from './../../shared/components/form-generator/classes/form-field-base';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FormControlService } from './../../shared/components/form-generator/form-control.service';
import { PokemonService } from './../../service/pokemon.service';
import { Pokemon } from './../../model/pokemon.interface';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ImageFormatValidator } from './../../shared/validators/image-file.validator';

@Component({
  selector: 'app-new-pokemon',
  templateUrl: './new-pokemon.component.html',
  styleUrls: ['./new-pokemon.component.scss']
})
export class NewPokemonComponent implements OnInit {
  @Input() fields: FormFieldBase<string>[] = [];
  form: FormGroup;
  types: string[] = [];

  imgCompressSize = 0.05; // MB
  loading = false;
  selectedPicture: any;
  errorCompressing = false;
  compressedPictureData: any = null;
  imageName: string;

  constructor(private fcs: FormControlService,
              private pokemonService: PokemonService,
              private ng2ImgMax: Ng2ImgMaxService) {
    this.types = this.pokemonService.getTypes();
  }

  ngOnInit() {
    this.fields = npf.registerPokemon(this.types);
    this.form = this.fcs.toFormGroup(this.fields);
    this.form.addControl('image', new FormControl('', [Validators.required, ImageFormatValidator]));
  }

  onSubmit() {
    this.pokemonService.insertNewPokemon(this.getRequestNewPokemon())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
    this.resetForm();
  }

  getRequestNewPokemon(): Pokemon {
    const request: Pokemon = {
      id: null,
      name: this.form.value.name,
      weight: Number(this.form.value.weight),
      type1: this.form.value.type,
      type2: null,
      image: this.compressedPictureData
    };
    return request;
  }

  onFileSelected(event: any) {
    this.loading = true;
    this.errorCompressing = false;
    this.selectedPicture = event.target.files[0];
    this.imageName = this.selectedPicture.name;

    if (this.selectedPicture && event.target.files[0].size <= 1000000) {
      this.ng2ImgMax.compressImage(this.selectedPicture, this.imgCompressSize)
        .subscribe(compressed => this.convertFileToBase64(compressed),
      error => {
        if (error.error === 'PNG_WITH_ALPHA' || error.error === 'MAX_STEPS_EXCEEDED') {
          this.form.get('image').setErrors({ invalid: true });
          this.errorCompressing = true;
          this.loading = false;
        } else {
          this.convertFileToBase64(error.compressedFile);
        }
      });
    } else if (event.target.files[0].size > 1000000) {
      this.form.get('image').setErrors({ invalid: true, wrongSize: true });
      this.loading = false;
    } else {
      this.loading = false;
    }

    console.log(this.form);
    // console.log(this.selectedPicture)
  }


  convertFileToBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.compressedPictureData = reader.result;
      // console.log(reader.result);
      // this.form.get('image').setErrors(null);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };

  }

  showMessage() {
    console.log('Show');
  }

  resetInputFile() {
    this.selectedPicture = null;
    this.compressedPictureData = null;
    this.imageName = null;
    this.form.get('image').reset();
  }

  resetForm() {
    this.resetInputFile();
    this.form.reset();
  }
}
