import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CarExplorerPageComponent} from '../pages/car-explorer-page/car-explorer-page.component';

@Component({
  selector: 'app-root',
  imports: [
    CarExplorerPageComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('car-explore-app');
}
