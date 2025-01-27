import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NewPokemonComponent } from './feature/new-pokemon/new-pokemon.component';
import { FormGeneratorComponent } from './shared/components/form-generator/form-generator.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormControlService } from './shared/components/form-generator/form-control.service';

import { HttpClientModule } from '@angular/common/http';
import { ListPokemonComponent } from './feature/list-pokemon/list-pokemon.component';
import { FilterPokemonComponent } from './feature/list-pokemon/filter-pokemon/filter-pokemon.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

import { Ng2ImgMaxModule } from 'ng2-img-max';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewPokemonComponent,
    FormGeneratorComponent,
    ListPokemonComponent,
    FilterPokemonComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2ImgMaxModule
  ],
  providers: [FormControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
