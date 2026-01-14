import {Component, input} from '@angular/core';
import {CarData} from '../../types/car.data';

@Component({
  selector: 'app-car-card',
  imports: [],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss',
})
export class CarCardComponent {
public car = input<CarData>();
}
