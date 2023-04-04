import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Goku' },
      { id: 2, name: 'Mega-Man' },
      { id: 3, name: 'Homem de Ferro' },
      { id: 4, name: 'Wolverine' },
      { id: 5, name: 'Valtermiranha' },
      { id: 6, name: 'Marlboro' },
      { id: 7, name: 'Vegeta' },
      { id: 8, name: 'Comunewton' },
      { id: 9, name: 'Super Shock' }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
