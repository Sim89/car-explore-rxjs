import {Component, inject} from '@angular/core';
import {CarService} from '../../services/car-service';
import {FavouritesService} from '../../services/favourites.service';
import {CarFilterComponent} from '../../components/car-filter/car-filter.component';
import {CarDetailsComponent} from '../../components/car-details/car-details.component';
import {AsyncPipe} from '@angular/common';
import {CarListComponent} from '../../components/car-list/car-list.component';
import {Observable} from 'rxjs';
import {CarData} from '../../types/car.data';
import {CarFilters} from '../../types/car.filters';

@Component({
  selector: 'app-car-explorer-page',
  imports: [
    CarFilterComponent,
    CarDetailsComponent,
    AsyncPipe,
    CarListComponent
  ],
  templateUrl: './car-explorer-page.component.html',
  styleUrl: './car-explorer-page.component.scss',
})
export class CarExplorerPageComponent {
private readonly _carService = inject(CarService);
private readonly _favouriteService = inject(FavouritesService);

protected readonly cars$ = this._carService.filteredCars$;
private readonly favouriteCount$ = this._favouriteService.favouriteCount$;
protected readonly selectedCar$ = this._carService.selectedCar$;

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
