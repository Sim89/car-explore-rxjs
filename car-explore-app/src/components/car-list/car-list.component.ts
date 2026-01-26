import {Component, inject, input, output} from '@angular/core';
import {CarData} from '../../types/car.data';
import {CarCardComponent} from '../car-card/car-card.component';
import {FavouritesService} from '../../services/favourites.service';

@Component({
  selector: 'app-car-list',
  imports: [
    CarCardComponent
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss',
})
export class CarListComponent {
  public cars = input<CarData [] | null>([]);
  public selectedCar = output<number>();
  public selectedCarId = input<number | null>(null);
  public favouriteIds = input<number [] | null>(null);

  public onClickSelectedCar(carId: number) {
    this.selectedCar.emit(carId);
  }

}
