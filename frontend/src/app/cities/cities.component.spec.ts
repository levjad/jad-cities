import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitiesComponent } from './cities.component';
import { CitiesService } from './cities.service';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { City } from '../../shared/types/cities.interface';
import { provideHttpClient } from '@angular/common/http';

describe('CitiesComponent', () => {
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;
  let citiesService: CitiesService;

  const mockCities: City[] = [
    {
      name: 'Test City',
      name_native: 'Test City',
      country: 'Test Country',
      continent: 'Test Continent',
      latitude: '12.34',
      longitude: '56.78',
      population: '1000',
      founded: '2023',
      landmarks: ['Test Landmark'],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitiesComponent, CommonModule, FormsModule],
      providers: [
        {
          provide: CitiesService,
          useValue: { getCities: () => of(mockCities) },
        },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CitiesComponent);
    component = fixture.componentInstance;
    citiesService = TestBed.inject(CitiesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cities on initialization', () => {
    expect(component.allCities()).toEqual(mockCities);
  });

  it('should filter cities based on input', () => {
    component.filterText.set('Test');
    expect(component.filteredCities()).toEqual(mockCities);

    component.filterText.set('Nonexistent');
    expect(component.filteredCities()).toEqual([]);
  });

  it('should update filterText on input change', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector(
      'input'
    );
    inputElement.value = 'New Filter';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.filterText()).toBe('New Filter');
  });

  it('should generate correct Google Maps URL for city', () => {
    const city = mockCities[0];
    const expectedUrl = `https://www.google.com/maps/place/${city.latitude},${city.longitude}`;
    expect(component.getGoogleMapsUrl(city)).toBe(expectedUrl);
  });

  it('should generate correct Google Maps URL for landmark', () => {
    const city = mockCities[0];
    const landmark = city.landmarks[0];
    const expectedUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${landmark}, ${city.name}, ${city.country}`
    )}`;
    expect(component.getGoogleMapsUrl(city, landmark)).toBe(expectedUrl);
  });
});
