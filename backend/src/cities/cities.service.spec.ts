import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import * as citiesData from '../../../data/cities.json';

describe('CitiesService', () => {
  let service: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of cities', () => {
    const cities: City[] = service.getCities();
    expect(cities).toBeInstanceOf(Array);
    expect(cities.length).toBe((citiesData as CitiesData).cities.length);
  });

  it('should return the correct city data', () => {
    const cities: City[] = service.getCities();
    expect(cities[0].name).toBe('Sydney');
    expect(cities[1].population).toBe('8419000');
  });
});