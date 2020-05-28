import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPokemonComponent } from './feature/new-pokemon/new-pokemon.component';
import { ListPokemonComponent } from './feature/list-pokemon/list-pokemon.component';

const routes: Routes = [
  { path: 'new-pokemon', component: NewPokemonComponent },
  { path: 'list-pokemon', component: ListPokemonComponent },
  { path: '**', redirectTo: 'new-pokemon', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
