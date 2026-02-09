import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject, catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map, Observable, of,
  shareReplay,
  Subject, switchMap
} from 'rxjs';
import {CarData} from '../types/car.data';
import {CarFilters} from '../types/car.filters';
import {CarApiService} from './car-api.service';

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

  private readonly allCarsSubject = new BehaviorSubject<CarData[]>([]);
  public readonly allCars$ = this.allCarsSubject.asObservable();

  private readonly apiCars$: Observable<CarData[]> = this.searchQuerySubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query: string)=> {
      const q = query?.trim().toLowerCase() ?? '';
      if (!q) {
        return of<CarData[]>([]);
      }
      return this.carApiService.searchCars(query).pipe(
        catchError(() => of<CarData[]> ([]))
      );
        }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor() {
    this.apiCars$.subscribe(newCars => {
      // const current = this.allCarsSubject.value;
      //
      // const mergedCars = [
      //   ...current,
      //   ...newCars.filter(car => !current.some(car => car.id === car.id)),
      // ];
      this.allCarsSubject.next(newCars);
    })
  };

  public readonly filteredCars$: Observable<CarData[]> = combineLatest([this.allCars$, this.filters$]).pipe(
    map(([cars, filters]): CarData[]  => {
    return cars.filter((car: CarData) => {
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
    });
    }),
      shareReplay({ bufferSize: 1, refCount: true })
      );

  public readonly selectedCar$: Observable<CarData | null> = combineLatest([ this.filteredCars$, this.selectedCarId$]).pipe(
    map(([cars, id]) => cars.find(c => c.id === id) || null),
    shareReplay({ bufferSize: 1, refCount: true })
    );


 public setSearchQuery(query:string ): void {
    this.searchQuerySubject.next(query.toLowerCase());
    const current = this.filterSubject.value;
    this.filterSubject.next({ ...current, searchTerm:  undefined});
    this.selectedCarIdSubject.next(null);
  }

  public updateFilters(filters: CarFilters): void {
   this.filterSubject.next(filters);
  }

  public selectCar(id: number): void {
   this.selectedCarIdSubject.next(id);
  }
}
