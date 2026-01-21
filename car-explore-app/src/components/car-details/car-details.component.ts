import {Component, inject, input, output} from '@angular/core';
import {CarData} from '../../types/car.data';
import {DecimalPipe} from '@angular/common';
import {CarFilters} from '../../types/car.filters';
import {FavouritesService} from '../../services/favourites.service';

@Component({
  selector: 'app-car-details',
  imports: [
    DecimalPipe
  ],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss',
})
export class CarDetailsComponent {
public car = input<CarData | null>(null);
public toggleFavourite = output<number>();
public deleteCar = output<number>();
public updateCar = output<CarFilters>();

public onToggleFavourites(): void {
  const car = this.car();
  if(!car) return;
  this.toggleFavourite.emit(car.id);
}

public onDelete(): void {
  const car = this.car();
  if(!car) return;
  this.deleteCar.emit(car.id);
}

public onUpdateFilteredCars(filter: CarFilters): void {
  this.updateCar.emit(filter);
}
}
