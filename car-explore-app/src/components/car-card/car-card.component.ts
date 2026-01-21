import {Component, input, output} from '@angular/core';
import {CarData} from '../../types/car.data';
import {NgClass} from '@angular/common';

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
public toggleCarFavourite = output<number>();

  onFavouriteClick(event: MouseEvent): void {
  event.stopPropagation();
  this.toggleCarFavourite.emit(this.car()!.id);
}

}
