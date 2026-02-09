import {Component, inject, input, output} from '@angular/core';
import {FavouritesService} from '../../services/favourites.service';
import {CarService} from '../../services/car-service';
import {combineLatest, map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {CarData} from '../../types/car.data';

@Component({
  selector: 'app-favourites-sidebar',
  templateUrl: './favourites-sidebar.component.html',
  styleUrl: './favourites-sidebar.component.scss',
  imports: [
    AsyncPipe
  ]
})
export class FavouritesSidebarComponent {
  private favouriteService = inject(FavouritesService);
  private carService = inject(CarService);
  public cars = input<CarData[] | null>();
  public removeFavourites = output<number>();

  public favouriteCars$: Observable<CarData[]> = combineLatest([
    this.favouriteService.favourites$,
    this.carService.allCars$ ]).pipe(
      map(([favouriteIds, cars ]) =>  cars.filter(car => favouriteIds.includes(car.id))
      )
  );

  public removeFavourite(carId: number): void {
    this.favouriteService.toggleFavourite(carId);
  }
}
