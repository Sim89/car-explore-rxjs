import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesSidebarComponent } from './favourites-sidebar.component';

describe('FavouritesSidebarComponent', () => {
  let component: FavouritesSidebarComponent;
  let fixture: ComponentFixture<FavouritesSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesSidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
