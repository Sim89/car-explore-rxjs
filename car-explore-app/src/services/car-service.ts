import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject, catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged, filter,
  map, of,
  refCount,
  shareReplay, startWith,
  Subject, switchMap
} from 'rxjs';
import {CarData} from '../types/car.data';
import {CarFilters} from '../types/car.filters';
import {CarApiService} from './car-api.service';
import {FavouritesService} from './favourites.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private carApiService = inject(CarApiService);

  private readonly searchQuerySubject = new Subject<string>();

  private readonly filterSubject = new BehaviorSubject<CarFilters>({});
  filters$ = this.filterSubject.asObservable();

  private readonly selectedCarIdSubject = new BehaviorSubject<number | null>(null);
  selectedCarId$ = this.selectedCarIdSubject.asObservable();


  private readonly apiCars$ = this.searchQuerySubject.pipe(
    filter(query => query.length > 0),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query=> this.carApiService.searchCars(query).pipe(
      catchError((err) => {
        console.error('API search Failed', err);
        return of([] as CarData[]);
      })
    )),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  public readonly filteredCars$= combineLatest([this.apiCars$, this.filters$]).pipe(
    map(([cars, filters]) => cars.filter((car => {
      if(filters.make && car.make !== filters.make) return false;
      if(filters.model && car.model !== filters.model) return false;
      if(filters.minPrice && car.price > filters.minPrice) return false;
      if(filters.maxPrice && car.price < filters.maxPrice) return false;
      const searchTerm = filters.searchTerm?.toLowerCase();
      if (searchTerm) {
        const search = `${car.make} ${car.model} ${car.year}`.toLowerCase();
        if (!search.includes(searchTerm)) return false;
      }
      return true;
    })
    ),
      shareReplay({ bufferSize: 1, refCount: true })
      ));

  public readonly selectedCar$ = combineLatest([ this.filteredCars$, this.selectedCarId$]).pipe(
    map(([cars, id]) => cars.find(car => car.id === id) || null),
    shareReplay({ bufferSize: 1, refCount: true })
    );


 public setSearchQuery(query:string ): void {
    this.searchQuerySubject.next(query.toLowerCase());
    const current = this.filterSubject.value;
    this.filterSubject.next({ ...current, searchTerm: query.toLowerCase() || undefined})
  }

  public updateFilters(filters: CarFilters): void {
   this.filterSubject.next(filters);
  }

  public selectCar(id: number): void {
   this.selectedCarIdSubject.next(id);
  }
}
