import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: any[] = []
  count: number

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((heroes) => {
        this.count = heroes.count
        this.heroes = heroes.results.map((pokemon)=> {
          return {
            id: pokemon.url.split('/')[6],
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
          }
      }).slice(0, 9)
    })
  }
}