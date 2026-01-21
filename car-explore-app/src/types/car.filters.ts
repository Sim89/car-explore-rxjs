export interface CarFilters {
  make?: string;
  model?: string;
  year?: string;
  mileage?: number;
  colour?: string;
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: 'petrol' | 'diesel';
  carType?: 'electric' | 'manual' | 'hybrid'
}
