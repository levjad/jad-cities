import { TestBed } from '@angular/core/testing';
import { CitiesService } from './cities.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { City } from '../../shared/types/cities.interface';

describe('CitiesService', () => {
  let service: CitiesService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitiesService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CitiesService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve cities data from the API', () => {
    const mockCities: City[] = [
      {
        name: 'Test City',
        name_native: 'Test City',
        country: 'Test Country',
        continent: 'Test Continent',
        latitude: '0',
        longitude: '0',
        population: '1000',
        founded: '2023',
        landmarks: ['Test Landmark'],
      },
    ];

    service.getCities().subscribe((cities) => {
      expect(cities).toEqual(mockCities);
    });

    const req = httpMock.expectOne('http://localhost:3000/cities');
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);
  });
});
