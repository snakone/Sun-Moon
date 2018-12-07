import { Component, OnInit } from '@angular/core';
import { PokemonType } from 'src/app/models/pokemon-type.model';
import { TypesService, TypeStatsService } from 'src/app/services/services.index';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Move } from 'src/app/models/move.model';
import { PokeItem } from 'src/app/models/poke-item.model';
import { TypeStats } from 'src/app/models/type-stats.model';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'sun-moon-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})

export class TypeComponent implements OnInit {

  type: PokemonType;
  single: Pokemon[];
  dual: Pokemon[];
  total: number;
  moves: Move[];
  best: Pokemon[];
  pokeitems: PokeItem[];
  chart: TypeStats;

  constructor(private _type:TypesService,
              private activatedRoute: ActivatedRoute,
              private _stats: TypeStatsService,
              private _location: Location) { }

  ngOnInit() {
    this.activatedRoute.params  // Subscribe to URL Changes
     .pipe(map((params:Params): string => params['type']), // Get the Name then SwitchMap
      switchMap((name: string) => this._type.getTypeByName(name)))
     .subscribe((res:any) => {
       this.type = res.type as PokemonType;
       this.single = res.single as Pokemon[];
       this.dual = res.dual as Pokemon[];
       this.total = this.single.length + this.dual.length;
       this.moves = res.moves as Move[];
       this.best = res.best as Pokemon[];
       this.pokeitems = res.pokeitems as PokeItem[];
       this.getStatsByType(this.type.type);
     })
  }

  getStatsByType(type:string){
    this.chart = this._stats.getTypes([type]);
  }

  goBack(){
    this._location.back();
  }

}
