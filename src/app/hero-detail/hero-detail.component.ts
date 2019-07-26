import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: any;
  @debugOutputAstAsTypeScript

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    // this.getHero()
  }

  // getHero(): void {
  //   // const id = +this.route.snapshot.paramMap.get('id');
  //   const id = this.heroId
  //   console.log(id + "yo")
  //   this.heroService.getHero(id)
  //     .subscribe((hero) => {
  //       //convert weight to pounds
  //       hero.weight = (hero.weight * 0.220462).toFixed(1)
  //       //convert height to feet inches
  //       const m = (hero.height*0.328084)
  //       const ft = Math.floor(m)
  //       const inch = Math.round((m-ft)*12)
  //       console.log(m)
  //       hero.height_text = ft + "'" + (inch < 10 ? '0' : '') + inch + "''"
  //       this.hero = hero
  //       this.getFlavorText()
  //     });
  // }

  // getFlavorText(): void {
  //   // const id = +this.route.snapshot.paramMap.get('id');
  //   const id = this.heroId
  //   this.heroService.getFlavorText(id)
  //     .subscribe((pokemon) => {
  //       console.log(pokemon)
  //       if(!pokemon.habitat) {
  //         this.hero.habitat = "Unknown"
  //       }
  //       else {
  //         this.hero.habitat = pokemon.habitat.name
  //       }
  //       const texts = pokemon.flavor_text_entries
  //       for(let i = 0; i < texts.length; i++) {
  //         if(texts[i].language.name==="en") {
  //           this.hero.text = texts[i].flavor_text
  //           break
  //         }
  //       }

  //       const genera = pokemon.genera
  //       for(let i = 0; i < genera.length; i++) {
  //         if(genera[i].language.name==="en") {
  //           this.hero.genus = genera[i].genus
  //           break
  //         }
  //       }
  //     })
  // }

//   goBack(): void {
//     this.location.back();
//   }

//  save(): void {
//     this.heroService.updateHero(this.hero)
//       .subscribe(() => this.goBack());
//   }
}