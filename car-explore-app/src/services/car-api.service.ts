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
      imageUrl: 'https://images.unsplash.com/photo-1638398417409-dd54452eccdf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    },
    {
      id: 2, make: 'BMW', model: 'i4', year: 2024, color: 'White', price: 48000, description: 'Electric and sporty',
      mileage: 1500,
      imageUrl: "https://images.unsplash.com/photo-1729966085578-c7b281cf11da?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3, make: 'Honda', model: 'Civic', year: 2023, color: 'Red', price: 14000, description: 'Reliable',
      mileage: 7000,
      imageUrl: "https://images.unsplash.com/photo-1561823528-057f4774dd3e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
    ];

  private readonly extraCars: CarData[] = [
{
  id: 4, make: 'Audi', model: 'Q5', year: 2021, color: 'Black', price: 36000, description:'Comfortable family SUV',
  mileage: 22000,
  imageUrl: 'https://images.unsplash.com/photo-1638398417409-dd54452eccdf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
},
    {
      id: 5, make: 'Mercedes', model: 'C Class', year: 2022, color: 'Black', price: 39000, description: 'Premium Saloon',
      mileage: 15000,
      imageUrl: 'https://images.unsplash.com/photo-1638398417409-dd54452eccdf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    },
    {
      id: 5, make: 'BMW', model: 'X3 xDrive', year: 2025, color: 'Grey', price: 52000, description: 'All wheel drive SUV with strong performance and comfort',
      mileage: 12000,
      imageUrl: 'https://images.unsplash.com/photo-1638398417409-dd54452eccdf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

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

  public searchCars(query: string): Observable<CarData[]> {
    const allCars = [
      ...this.mockCarData,
      ...this.extraCars,
    ];
    return of(allCars.filter(car => `${car.make} ${car.model}`.toLowerCase().includes(query.toLowerCase())));
  }
}
