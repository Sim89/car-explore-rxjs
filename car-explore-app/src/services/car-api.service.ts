import {inject, Injectable} from '@angular/core';
import {CarData} from '../types/car.data';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../environment';
import {map, Observable, of} from 'rxjs';

interface ApiCar {
  make: string;
  model: string;
  year: number;
  class?: string;
  fuel_type?: string;
  drive?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarApiService {
  private httpClient = inject(HttpClient);

  public searchCars(query: string): Observable<CarData[]> {
    let params = new HttpParams();

    const make = query.trim().split(',')[0];
    if (make) {
      params = params.set('make', make);
    }

    const headers =  new HttpHeaders({
      'X-Api-Key': environment.carApiKey
    });
    return this.httpClient.get<ApiCar[]>(environment.carApiUrl, { params, headers }).pipe(
      map(results => results.map((car, index) => ({
        id: Date.now() + index,
        make: car.make,
        model: car.model,
        year: car.year,
        color: 'Unknown',
        price: this.randomPrice(),
        mileage: this.randomMileage(),
        description: `${car.class ?? 'Car'} ${car.fuel_type ?? ''}`,
        imageUrl: this.getImageForMake(car.make)
      }))));

  }

  private randomPrice(): number {
    return Math.floor(Math.random() * 20000) + 30000;
  }

  private randomMileage(): number {
    return Math.floor(Math.random() * 50000) ;
  }

  private getImageForMake(make: string): string {
    const images: Record<string, string> = {
      BMW: 'https://images.unsplash.com/photo-1729966085578-c7b281cf11da?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Tesla: 'https://images.unsplash.com/photo-1638398417409-dd54452eccdf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Audi: 'https://images.unsplash.com/photo-1638398417409-dd54452eccdf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      };
    return images[make] ?? `https://source.unsplash.com/featured/`;
  }

//   private readonly mockCarData: CarData[] = [
//     {
//       id: 1, make: 'Tesla', model: 'Model 3', year: 2025, color: 'White', price: 42000, description: 'Easy to drive',
//       mileage: 2500,
//       imageUrl: 'https://images.unsplash.com/photo-1638398417409-dd54452eccdf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//
//     },
//     {
//       id: 2, make: 'BMW', model: 'i4', year: 2024, color: 'White', price: 48000, description: 'Electric and sporty',
//       mileage: 1500,
//       imageUrl: "https://images.unsplash.com/photo-1729966085578-c7b281cf11da?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     },
//     {
//       id: 3, make: 'Honda', model: 'Civic', year: 2023, color: 'Red', price: 14000, description: 'Reliable',
//       mileage: 7000,
//       imageUrl: "https://images.unsplash.com/photo-1561823528-057f4774dd3e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     }
//     ];
//
//   private readonly extraCars: CarData[] = [
// {
//   id: 4, make: 'Audi', model: 'Q5', year: 2021, color: 'Black', price: 36000, description:'Comfortable family SUV',
//   mileage: 22000,
//   imageUrl: 'https://images.unsplash.com/photo-1638398417409-dd54452eccdf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
// },
//     {
//       id: 5, make: 'Mercedes', model: 'C Class', year: 2022, color: 'Black', price: 39000, description: 'Premium Saloon',
//       mileage: 15000,
//       imageUrl: 'https://images.unsplash.com/photo-1638398417409-dd54452eccdf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//
//     },
//     {
//       id: 5, make: 'BMW', model: 'X3 xDrive', year: 2025, color: 'Grey', price: 52000, description: 'All wheel drive SUV with strong performance and comfort',
//       mileage: 12000,
//       imageUrl: 'https://images.unsplash.com/photo-1638398417409-dd54452eccdf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//
//     }
//   ];
//
//   public loadCars(): Observable<CarData[]> {
//     const storeCars = localStorage.getItem('car-data');
//     const cars = storeCars ? JSON.parse(storeCars) : this.mockCarData;
//     return of(cars);
//   }
//
//   public saveCars(cars: CarData[]): void {
//     localStorage.setItem(this.localStorageKey, JSON.stringify(cars));
//   }
}
