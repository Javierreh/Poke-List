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
import { HomeComponent } from './feature/home/home.component';
import { ListPokemonComponent } from './feature/list-pokemon/list-pokemon.component';
import { FilterPokemonComponent } from './feature/list-pokemon/filter-pokemon/filter-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewPokemonComponent,
    FormGeneratorComponent,
    HomeComponent,
    ListPokemonComponent,
    FilterPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FormControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
