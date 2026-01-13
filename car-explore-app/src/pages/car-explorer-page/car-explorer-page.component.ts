import {Component, inject} from '@angular/core';
import {CarService} from '../../services/car-service';
import {FavouritesService} from '../../services/favourites.service';
import {CarFilterComponent} from '../../components/car-filter/car-filter.component';

@Component({
  selector: 'app-car-explorer-page',
  imports: [
    CarFilterComponent
  ],
  templateUrl: './car-explorer-page.component.html',
  styleUrl: './car-explorer-page.component.scss',
})
export class CarExplorerPageComponent {
private readonly _carService = inject(CarService);
private readonly _favouriteService = inject(FavouritesService);

private readonly cars$ = this._carService.filteredCars$;
private readonly favouriteCount$ = this._favouriteService.favouriteCount$;
private readonly selectedCar$ = this._carService.selectedCar$;

public onSearch(query:string): void {
  this._carService.setSearchQuery(query);
}
public selectCar(carId: number): void {
  this._carService.selectCar(carId);
}
public onToggleFavourite(id: number): void {
  this._favouriteService.toggleFavourite(id);
}
}
