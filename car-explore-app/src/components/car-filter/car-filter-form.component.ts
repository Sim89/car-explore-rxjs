import {Component, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CarFilters} from '../../types/car.filters';

@Component({
  selector: 'app-car-filter',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './car-filter-form.component.html',
  styleUrl: './car-filter-form.component.scss',
})
export class CarFilterFormComponent implements OnInit {
  public searchQuery = output<string>();
  public filterChange = output<CarFilters>();
  public showFilters = signal(false);

  public onInputSearch(value: string): void {
    this.searchQuery.emit(value);
  };
  public toggleFilters(): void {
    this.showFilters.update(value => !value);
  }

  private filters(filter: CarFilters): CarFilters {
    return Object.fromEntries(
      Object.entries({
        make: filter.make,
        model: filter.model,
        colour: filter.colour,
        year: filter.year,
        mileage: filter.mileage,
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        carType: filter.carType,
        fuelType: filter.fuelType
      }).filter(([ , value]) => value !== null && value !== '' && value !== undefined)
    ) as CarFilters;
  }

  public carInputForm: FormGroup = new FormGroup({
    searchTerm: new FormControl<string>(''),
    make: new FormControl<string>(''),
    model: new FormControl<string>(''),
    colour: new FormControl<string>(''),
    year: new FormControl<number | null>(null, [Validators.min(1886)]),
    mileage: new FormControl<number | null>(null, [Validators.min(0)]),
    minPrice: new FormControl<number | null>(null, [Validators.min(0)]),
    maxPrice: new FormControl<number | null>(null, [Validators.min(0)]),
    carType: new FormControl<string | null>(null),
    fuelType: new FormControl<string | null>(null),
  });

 public ngOnInit() {
    this.carInputForm.get('searchTerm')!
      .valueChanges
      .subscribe(value => {
        this.filterChange.emit({
          ...this.filters(this.carInputForm.value),
          searchTerm: value
        });
      });
}
}
