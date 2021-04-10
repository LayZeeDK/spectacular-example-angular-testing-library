import { Injectable } from '@angular/core';
import { asapScheduler, Observable, of, scheduled } from 'rxjs';

import { Hero } from './hero';
import { HeroService } from './hero.service';

const heroes: Hero[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Nacho' },
  { id: 13, name: 'Serkan' },
  { id: 14, name: 'Santosh' },
  { id: 15, name: 'Lars' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' },
];

@Injectable({
  providedIn: 'root',
})
export class FakeHeroService implements Partial<HeroService> {
  addHero(hero: Hero): Observable<Hero> {
    const randomId = Math.ceil(10000 * Math.random());
    hero = { ...hero, id: randomId };

    return scheduled(of(hero), asapScheduler);
  }

  deleteHero(id: number): Observable<Hero> {
    throw new Error('Not implemented.');
  }

  getHeroes(): Observable<Hero[]> {
    return scheduled(of(heroes), asapScheduler);
  }
}
