import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { PokemonsService } from '../../services/pokemons.service';
import { IPokemon } from '../../interfaces/ipokemon';
import { NgFor } from '@angular/common';
import { ITipo } from '../../interfaces/itipo';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.css'
})
export class PokemonFormComponent {
  @Output() pokemonAdded = new EventEmitter<IPokemon>();
  tipos: ITipo[] = [];


  @ViewChild('registerPokemonForm') registerPokemonForm!: NgForm;

  registerPokemon: FormGroup;
  pokemons: IPokemon[] = [];

  constructor(private pokemonService: PokemonsService) {
    this.registerPokemon = new FormGroup({
      nombre: new FormControl(null),
      numeroPokedex: new FormControl(null),
      habilidad: new FormControl(null),
      tipo: new FormControl(null),
      imagen: new FormControl(null)
    });
  }

  ngOnInit(): void {
    const savedPokemons = localStorage.getItem('pokemons');
    if (savedPokemons) {
      this.pokemons = JSON.parse(savedPokemons);
    }
  }

  getDataForm(): void {
    const newPokemon: IPokemon = this.registerPokemon.value;
    this.pokemonService.insert(newPokemon);
    this.pokemonAdded.emit(newPokemon);
    alert('Pokemon guardado exitosamente.');

    window.location.reload();
  }


}
