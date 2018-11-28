import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';  // Material Dialog
import { PokemonService } from 'src/app/services/services.index';
import { Pokemon } from 'src/app/models/pokemon.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { TYPES } from 'src/app/config/data';

@Component({
  selector: 'app-create-pokemon',
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.scss']
})

export class CreatePokemonComponent implements OnInit {

  pokemon: Pokemon;
  pokemonForm: FormGroup;
  types: string[];
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9.\'-][A-Za-z0-9 _]*$';
  disabled: boolean = true;

  constructor(private _pokemon: PokemonService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.types = TYPES;
    this.createPokemonForm();
  }

  createPokemonForm():void{
    this.pokemonForm = new FormGroup({
      name: new FormControl(null, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(30),
                                   Validators.pattern(this.namePattern)]),
      pokedex: new FormControl(null, [Validators.required]),
      picture: new FormControl(null, [Validators.required]),
      grade: new FormControl('', [Validators.required]),
      evolution: new FormControl('', [Validators.required]),
      info: new FormControl(null, [  // INFO
                                   Validators.required,
                                   Validators.minLength(10),
                                   Validators.maxLength(130)]),
      type: new FormControl('', [Validators.required]),
      type2: new FormControl('', [Validators.required]),
      attack: new FormControl('', [Validators.required]),
      legend: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      family: new FormControl('', [Validators.required]),
      HP: new FormControl(null, [  // HP
                                  Validators.required,
                                  Validators.min(1),
                                  Validators.max(445)]),
      ATK: new FormControl(null, [  // ATK
                                  Validators.required,
                                  Validators.min(1),
                                  Validators.max(255)]),
      DEF: new FormControl(null, [  // DEF
                                  Validators.required,
                                  Validators.min(1),
                                  Validators.max(255)]),
      SATK: new FormControl(null, [  // S.ATK
                                  Validators.required,
                                  Validators.min(1),
                                  Validators.max(255)]),
      SDEF: new FormControl(null, [  // S.DEF
                                  Validators.required,
                                  Validators.min(1),
                                  Validators.max(255)]),
      SPD: new FormControl(null, [  // SPD
                                  Validators.required,
                                  Validators.min(1),
                                  Validators.max(255)]),
      SS: new FormControl(null, [  // SS
                                  Validators.required,
                                  Validators.min(1)])
    });
  }

  onSubmit(){
    if (this.pokemonForm.invalid) return false;

    this._pokemon.createPokemon(this.pokemonForm.value)
     .subscribe(() => {
       Swal('Great!', 'Pokemon created!', 'success')
     });
  }

  closeModal():void {
    this.dialog.closeAll();
  }

}
