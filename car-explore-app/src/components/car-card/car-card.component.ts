import {Component, input, output} from '@angular/core';
import {NgClass} from '@angular/common';
import {CarData} from '../../types/car.data';

@Component({
  selector: 'app-car-card',
  imports: [
    NgClass
  ],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss',
})
export class CarCardComponent {
public car = input<CarData>();
public isFavourite = input<boolean>();
public toggleFavourite = output<number>();

  onToggleFavourite(event: MouseEvent): void {
    event?.stopPropagation();
    this.toggleFavourite.emit(this.car()!.id);
  }

}
