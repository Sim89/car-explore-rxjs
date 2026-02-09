import {Component, inject, OnInit, signal} from '@angular/core';
import {CarService} from '../../services/car-service';
import {FavouritesService} from '../../services/favourites.service';
import {CarFilterFormComponent} from '../../components/car-filter/car-filter-form.component';
import {CarDetailsComponent} from '../../components/car-details/car-details.component';
import {AsyncPipe} from '@angular/common';
import {CarListComponent} from '../../components/car-list/car-list.component';
import {combineLatest, map} from 'rxjs';
import {CarFilters} from '../../types/car.filters';
import {FavouritesSidebarComponent} from '../../components/favourites-sidebar/favourites-sidebar.component';
import {CarData} from '../../types/car.data';

@Component({
  selector: 'app-car-explorer-page',
  imports: [
    CarFilterFormComponent,
    CarDetailsComponent,
    AsyncPipe,
    CarListComponent,
    FavouritesSidebarComponent
  ],
  templateUrl: './car-explorer-page.component.html',
  styleUrl: './car-explorer-page.component.scss',
})
export class CarExplorerPageComponent implements OnInit {
private readonly _carService = inject(CarService);
protected readonly _favouriteService = inject(FavouritesService);

protected readonly cars$ = this._carService.filteredCars$;
protected readonly favouriteCount$ = this._favouriteService.favouriteCount$;
protected readonly selectedCar$ = this._carService.selectedCar$;
protected readonly selectedCarId$ = this._carService.selectedCarId$;
public showFavourites = signal<boolean>(true);

protected readonly favouriteCars$ = combineLatest([this._carService.allCars$, this._favouriteService.favourites$]).pipe(
    map(([cars, favouriteIds]) =>
      cars.filter(car => favouriteIds.includes(car.id))));

  public onSearch(value:string ): void {
 this._carService.setSearchQuery(value);
}

public ngOnInit () {
    this._favouriteService.favourites$.subscribe(ids => {
      this.showFavourites.set(ids.length > 0);
    })
}

public selectCar(carId: number): void {
  this._carService.selectCar(carId);
}
public onToggleFavourite(id: number): void {
  this._favouriteService.toggleFavourite(id);
  this.showFavourites.set(true);

}

public onUpdateFilteredCars(filter: CarFilters) : void {
  this._carService.updateFilters(filter);
}
}
