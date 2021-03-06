import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { HeroDetailComponent } from '../hero-detail/hero-detail.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  heroes: any[] = []
  count: number
  hero: any
  open_modal: boolean
  has_clicked: boolean

  constructor(private heroService: HeroService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getHeroes()
    this.open_modal = false
    this.has_clicked = false
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((heroes) => {
        this.count = heroes.count
        this.heroes = heroes.results.map((pokemon)=> {
          return {
            id: pokemon.url.split('/')[6],
            name: pokemon.name
          }
      }).slice(0, 9)
    })
  }

  getHero(heroId:number): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    // const id = this.heroId
    this.heroService.getHero(heroId)
      .subscribe((hero) => {
        //convert weight to pounds
        hero.weight = (hero.weight * 0.220462).toFixed(1)
        //convert height to feet inches
        const m = (hero.height*0.328084)
        const ft = Math.floor(m)
        const inch = Math.round((m-ft)*12)
        console.log(m)
        hero.height_text = ft + "'" + (inch < 10 ? '0' : '') + inch + "''"
        this.hero = hero
        this.getFlavorText(heroId)
      });
  }

  getFlavorText(heroId:number): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    // const id = this.heroId
    this.heroService.getFlavorText(heroId)
      .subscribe((pokemon) => {
        console.log(pokemon)
        if(!pokemon.generation) {
          this.hero.generation = "Unknown"
        }
        else {
          console.log(pokemon.generation)
          this.hero.generation = "Gen " + pokemon.generation.name.split('-')[1]
        }
        if(!pokemon.habitat) {
          this.hero.habitat = "Unknown"
        }
        else {
          this.hero.habitat = pokemon.habitat.name
        }
        const texts = pokemon.flavor_text_entries
        for(let i = 0; i < texts.length; i++) {
          if(texts[i].language.name==="en") {
            this.hero.text = texts[i].flavor_text
            break
          }
        }

        const genera = pokemon.genera
        for(let i = 0; i < genera.length; i++) {
          if(genera[i].language.name==="en") {
            this.hero.genus = genera[i].genus
            break
          }
        }
        if(!this.open_modal){
          const modalRef = this.modalService.open(HeroDetailComponent)
          modalRef.componentInstance.hero = this.hero
          this.open_modal = true
          modalRef.result.then(() => {
            this.has_clicked = false
            this.open_modal=false
          }, () => {
            this.has_clicked = false
            this.open_modal=false
          })
        }
      })
  }

  open(id:number): void {
    if(!this.has_clicked) {
      this.getHero(id)
      this.has_clicked = true
    }
    
  }
}