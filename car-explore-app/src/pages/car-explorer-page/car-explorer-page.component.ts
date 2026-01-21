import {Component, inject} from '@angular/core';
import {CarService} from '../../services/car-service';
import {FavouritesService} from '../../services/favourites.service';
import {CarFilterFormComponent} from '../../components/car-filter/car-filter-form.component';
import {CarDetailsComponent} from '../../components/car-details/car-details.component';
import {AsyncPipe} from '@angular/common';
import {CarListComponent} from '../../components/car-list/car-list.component';
import {combineLatest, map, Observable} from 'rxjs';
import {CarData} from '../../types/car.data';
import {CarFilters} from '../../types/car.filters';
import {CarApiService} from '../../services/car-api.service';

@Component({
  selector: 'app-car-explorer-page',
  imports: [
    CarFilterFormComponent,
    CarDetailsComponent,
    AsyncPipe,
    CarListComponent
  ],
  templateUrl: './car-explorer-page.component.html',
  styleUrl: './car-explorer-page.component.scss',
})
export class CarExplorerPageComponent {
private readonly _carService = inject(CarService);
private readonly _carApiService = inject(CarApiService);
protected readonly _favouriteService = inject(FavouritesService);

protected cars$ = this._carService.filteredCars$;
protected readonly favouriteCount$ = this._favouriteService.favouriteCount$;
protected readonly selectedCar$ = this._carService.selectedCar$;
protected readonly selectedCarId$ = this._carService.selectedCarId$;

protected readonly favouriteCars$ = combineLatest([this._carService.filteredCars$, this._favouriteService.favourites$]).pipe(
    map(([cars, favouriteIds]) =>
      cars.filter(car => favouriteIds.includes(car.id))));

  public onSearch(query:string ): void {
 this._carService.setSearchQuery(query);
}
public selectCar(carId: number): void {
  this._carService.selectCar(carId);
}
public onToggleFavourite(id: number): void {
  this._favouriteService.toggleFavourite(id);
}
public onAddCar(car: CarData): void {
  this._carService.addCar(car);
}
public onUpdateCar(car: CarData): void {
  this._carService.updateSelectedCar(car);
}
public onDeleteCar(carId: number): void {
  this._carService.deleteCar(carId);
}
public onUpdateFilteredCars(filter: CarFilters) : void {
  this._carService.updateFilters(filter);
}
}
