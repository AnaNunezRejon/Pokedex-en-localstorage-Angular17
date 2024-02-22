import { PokemonsService } from './../../services/pokemons.service';
import { Component } from '@angular/core';
import { IPokemon } from '../../interfaces/ipokemon';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent, FiltersComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {
  pokemons: IPokemon[] = [];

  constructor(private pokemonService: PokemonsService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    const savedPokemons = localStorage.getItem('pokemons');
    if (savedPokemons) {
      this.pokemons = JSON.parse(savedPokemons);
    }
  }

  getTipo(tipo: string): void {
    this.pokemons = this.pokemonService.filterByTipo(tipo);
  }

  onPokemonAdded(newPokemon: IPokemon): void {
    this.pokemons.push(newPokemon);
  }

}
