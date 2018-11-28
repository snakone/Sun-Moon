import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PokemonService } from 'src/app/services/services.index';
import { Pokemon } from 'src/app/models/pokemon.model';
import { switchMap, map} from 'rxjs/operators';

@Component({
  selector: 'sun-moon-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})

export class PokemonComponent implements OnInit {

  pokemon: Pokemon;
  next: string;
  previous: string;
  familiars: string[];

  constructor(private activatedRoute: ActivatedRoute,
              private _pokemon: PokemonService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params  // Subscribe to URL Changes
     .pipe(map((params:Params): string => params['name']), // Get the Name then SwitchMap
      switchMap((name: string) => this._pokemon.getPokemonByName(name)))
     .subscribe((res:any) => {
          this.pokemon = res.pokemon as Pokemon;
          this.familiars = res.familiars;
          this.next = res.next;
          this.previous = res.previous;
        });
  }

  goBack(){
    this.router.navigate(['/pokedex']);
  }

}
