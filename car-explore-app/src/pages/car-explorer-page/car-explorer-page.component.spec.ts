import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarExplorerPageComponent } from './car-explorer-page.component';

describe('CarExplorerPageComponent', () => {
  let component: CarExplorerPageComponent;
  let fixture: ComponentFixture<CarExplorerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarExplorerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarExplorerPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
