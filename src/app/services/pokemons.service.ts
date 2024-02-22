import { Injectable } from '@angular/core';
import { IPokemon } from '../interfaces/ipokemon';
import { POKEMON } from '../db/pokemons.db';
import { ITipo } from '../interfaces/itipo';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  getPokemons(): IPokemon[] {
    return this.arrPokemons;
  }

  private arrPokemons: IPokemon[] = POKEMON;
  private arrTipos: ITipo[] = [
    { title: 'Agua', value: 'Agua' },
    { title: 'Fuego', value: 'Fuego' },
    { title: 'Planta', value: 'Planta' },
    { title: 'Eléctrico', value: 'Electrico' },
    { title: 'Roca', value: 'Roca' },
    { title: 'Fantasma', value: 'Fantasma' },
    { title: 'Hielo', value: 'Hielo' },
    { title: 'Psiquico', value: 'Psiquico' },
    { title: 'Volador', value: 'Volador' },
    { title: 'Veneno', value: 'Veneno' },
    { title: 'Normal', value: 'Normal' },
    { title: 'Tierra', value: 'Tierra' },
    { title: 'Hada', value: 'Hada' },
    { title: 'Lucha', value: 'Lucha' },
    { title: 'Acero', value: 'Acero' },
    { title: 'Dragón', value: 'Dragon' },
  ];

  private id: number = 5;
  private readonly localStorageKey = 'pokemons';

  constructor() {
    const storedPokemons = this.getAll();
    const uniqueStoredPokemons = storedPokemons.filter(storedPokemon =>
      !POKEMON.some(pokemon => pokemon.id === storedPokemon.id)
    );
    this.arrPokemons = [...POKEMON, ...uniqueStoredPokemons];
    this.arrPokemons = this.getAll();
  }
  getAllTipos(): ITipo[] {
    return this.arrTipos;
  }
  getAll(): IPokemon[] {
    const pokemonsJson = localStorage.getItem(this.localStorageKey);
    return pokemonsJson ? JSON.parse(pokemonsJson) : [];
  }
  getById(id: number): IPokemon | undefined {
    return this.arrPokemons.find(pokemon => pokemon.id === id);
  }
  insert(pokemon: IPokemon): string {
    pokemon.id = this.getNextId();
    if (pokemon.id !== undefined) {
      this.arrPokemons.push(pokemon);
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.arrPokemons));
      return 'El pokemon ha sido insertado correctamente';
    } else {
      return 'No ha sido posible insertar el pokemon';
    }
  }
  private getNextId(): number {
    const maxId = Math.max(...this.arrPokemons.map(p => p.id ?? 0));
    return maxId !== -Infinity ? maxId + 1 : 1;
  }
  delete(id: number): void {
    let pokemons = this.getAll();
    pokemons = pokemons.filter(pokemon => pokemon.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(pokemons));
  }
  filterByTipo(tipo: string): IPokemon[] {
    return this.arrPokemons.filter(pokemon => pokemon.tipo.includes(tipo));
  }
}
