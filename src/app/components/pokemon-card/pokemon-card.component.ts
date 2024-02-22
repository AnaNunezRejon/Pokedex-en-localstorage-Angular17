import { Component, Input } from '@angular/core';
import { IPokemon } from '../../interfaces/ipokemon';
import { PokemonsService } from '../../services/pokemons.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {
  @Input() miPokemon!: IPokemon

  constructor(private pokemonService: PokemonsService) { }

  confirmDelete(): void {
    if (this.miPokemon && confirm('¿Estás seguro de que deseas eliminar este Pokémon?')) {
      this.deletePokemon(this.miPokemon);
    }
  }

  deletePokemon(pokemon: IPokemon): void {
    console.log('Eliminando Pokémon con ID:', pokemon.id);
    if (pokemon && pokemon.id !== undefined) {
      this.pokemonService.delete(pokemon.id);
      alert('Pokemon eliminado exitosamente.');
      window.location.reload();
    } else {
      console.error('No se pudo eliminar el Pokémon porque el objeto miPokemon o su id son indefinidos.');
    }
  }

  getPokemonTypeClass(type: string): string {
    switch (type) {
      case 'Agua':
        return 'water-type';
      case 'Fuego':
        return 'fire-type';
      case 'Planta':
        return 'plant-type';
      case 'Electrico':
        return 'electric-type';
      case 'Roca':
        return 'roca-type';
      case 'Fantasma':
        return 'fantasma-type';
      case 'Hielo':
        return 'hielo-type';
      case 'Psiquico':
        return 'psiquico-type';
      case 'Volador':
        return 'volador-type';
      case 'Veneno':
        return 'veneno-type';
      case 'Normal':
        return 'normal-type';
      case 'Tierra':
        return 'tierra-type';
      case 'Hada':
        return 'hada-type';
      case 'Lucha':
        return 'lucha-type';
      case 'Acero':
        return 'acero-type';
      case 'Dragon':
        return 'dragon-type';
      default:
        return '';
    }
  }

}
