import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private readonly localStorageKey = 'favouriteCarIds';

  private readonly favouriteSubject = new BehaviorSubject<number[]>([]);
  readonly favourites$ = this.favouriteSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }
  private loadFromStorage(): void {
    const storedFavourites = localStorage.getItem(this.localStorageKey);
    this.favouriteSubject.next(storedFavourites ? JSON.parse(storedFavourites) : []);
  }

  private saveFavourites(favouritesId: number[]) : void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(favouritesId));
  }

  public favouriteCount$ = this.favourites$.pipe(
    map(favouritesIds => favouritesIds.length));

  public toggleFavourite(carId: number): void {
    const currentFavourite = this.favouriteSubject.value;

    const updateFavouriteCar = currentFavourite.includes(carId) ? currentFavourite.filter(id => id !== carId) : [...currentFavourite, carId];
    this.favouriteSubject.next(updateFavouriteCar);
    this.saveFavourites(updateFavouriteCar);
  }

  public isFavourite(carId: number): boolean {
    return this.favouriteSubject.value.includes(carId);
  }

  public clearFavourites(): void {
    this.favouriteSubject.next([]);
    this.saveFavourites([]);
  }
}
