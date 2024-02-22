import { PokemonsService } from './../../services/pokemons.service';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITipo } from '../../interfaces/itipo';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {

  tipos: ITipo[] = [];
  pokemonServices = inject(PokemonsService)
  @Output() tipoSeleccionado: EventEmitter<string> = new EventEmitter()

  ngOnInit() {
    this.tipos = this.pokemonServices.getAllTipos();
  }

  getDataFilter(form: any): void {
    this.tipoSeleccionado.emit(form.value.tipo);
  }
}
