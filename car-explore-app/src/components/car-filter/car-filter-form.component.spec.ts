import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFilterFormComponent } from './car-filter-form.component';

describe('CarFilterFormComponent', () => {
  let component: CarFilterFormComponent;
  let fixture: ComponentFixture<CarFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarFilterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarFilterFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
