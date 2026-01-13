import { Injectable, inject } from '@angular/core';
import {BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, shareReplay, Subject} from 'rxjs';
import {CarData} from '../types/car.data';
import {CarFilters} from '../types/car.filters';
import {CarApiService} from './car-api.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private carApiService = inject(CarApiService);
  private readonly carsSubject = new BehaviorSubject<CarData[]>([]);
  cars$ = this.carsSubject.asObservable();

  private readonly filterSubject = new BehaviorSubject<CarFilters>({});
  filters$ = this.filterSubject.asObservable();

  private readonly selectedCarIdSubject = new BehaviorSubject<number | null>(null);
  selectedCarId$ = this.selectedCarIdSubject.asObservable();

  private readonly searchQuerySubject = new Subject<string>();

  private loadInitialCars(): void {
    this.carApiService.loadCars().subscribe(cars => {
      this.carsSubject.next(cars);
    });
  }
  public readonly filteredCars$= combineLatest([this.cars$, this.filters$]).pipe(
    map(([cars, filters]) => cars.filter((car => {
      if(filters.make && car.make !== filters.make) return false;
      if(filters.model && car.model !== filters.model) return false;
      if(filters.searchTerm && !`${car.make} ${car.model}`.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
    if(filters.minPrice && car.price > filters.minPrice) return false;
    return !(filters.maxPrice && car.price < filters.maxPrice);
    })
    ),
      shareReplay(1)
      ));

  public readonly selectedCar$ = combineLatest([this.cars$, this.selectedCarId$]).pipe(
    map(([cars, id]) => cars.find(car => car.id === id) || null),
    shareReplay(1)
    );


 public setSearchQuery(query:string): void {
    this.searchQuerySubject.next(query);
  }

  private carSearch(): void {
    this.searchQuerySubject.pipe(
      debounceTime(300),
      distinctUntilChanged()).subscribe(term => {
        const currentFilter = this.filterSubject.value;
        this.filterSubject.next({...currentFilter, searchTerm: term || undefined});
    })
  }

  public updateFilters(filters: CarFilters): void {
   this.filterSubject.next(filters);
  }

  public selectCar(id: number): void {
   this.selectedCarIdSubject.next(id);
  }

  public updateSelectedCar(updated: CarData): void {
   const updateCar = this.carsSubject.value.map(car => car.id === updated.id ? updated : car);
   this.carsSubject.next(updateCar);
   this.carApiService.saveCars(updateCar);
  }

  public addCar(newCar: CarData): void {
   const addNewCar = [...this.carsSubject.value, newCar];
   this.carsSubject.next(addNewCar);
   this.carApiService.saveCars(addNewCar);
  }

  public deleteCar(id: number): void {
   const deleteCar = this.carsSubject.value.filter(car => car.id !== id);
   this.carsSubject.next(deleteCar);
   this.carApiService.saveCars(deleteCar);
  }
}
