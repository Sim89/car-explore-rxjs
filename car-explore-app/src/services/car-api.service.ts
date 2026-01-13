import { Injectable } from '@angular/core';
import {CarData} from '../types/car.data';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarApiService {
  private readonly localStorageKey = 'car-data';

  private readonly mockCarData: CarData[] = [
    {
      id: 1, make: 'Tesla', model: 'Model 3', year: 2025, color: 'White', price: 42000, description: 'Easy to drive',
      mileage: 2500,
      imageUrl: 'https://unsplash.com/photos/a-white-car-parked-in-front-of-a-mountain-range-CqT2lBwOVuc'
    },
    {
      id: 2, make: 'BMW', model: 'i4', year: 2024, color: 'White', price: 48000, description: 'Electric and sporty',
      mileage: 1500,
      imageUrl: "https://unsplash.com/photos/a-white-car-parked-in-a-parking-garage-iXHHhfwJD1E"
    },
    {
      id: 3, make: 'Honda', model: 'Civic', year: 2023, color: 'Red', price: 14000, description: 'Reliable',
      mileage: 7000,
      imageUrl: "https://unsplash.com/photos/red-honda-civic-sedan-6O0RognPLwE"
    }
    ];

  public loadCars(): Observable<CarData[]> {
    const storeCars = localStorage.getItem('car-data');
    const cars = storeCars ? JSON.parse(storeCars) : this.mockCarData;
    return of(cars);
  }

  public saveCars(cars: CarData[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cars));
  }
}
