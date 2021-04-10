import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroDetailComponent, HeroDetailScam } from './hero-detail/hero-detail.component';
import { HeroesComponent, HeroesScam } from './heroes/heroes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HeroesScam, HeroDetailScam],
})
export class HeroesModule {}
