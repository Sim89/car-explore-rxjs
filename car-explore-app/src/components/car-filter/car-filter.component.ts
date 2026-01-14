import {Component, output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-car-filter',
  imports: [
    FormsModule
  ],
  templateUrl: './car-filter.component.html',
  styleUrl: './car-filter.component.scss',
})
export class CarFilterComponent {
  public searchQuery = output<string>();
  public term = ''

  public onInputSearch(value: string): void {
    console.log('search:', value);
    this.searchQuery.emit(value);
  };
}
