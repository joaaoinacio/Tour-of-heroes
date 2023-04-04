import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // empurre um termo de pesquisa para o fluxo observável.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // espera 300 ms apos apertar a ultima tecla
      debounceTime(300),

      // ignora novo termo se for igual ao anterior
      distinctUntilChanged(),

      // alterar pra outra pesquisa sempre que o termo mudar
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
