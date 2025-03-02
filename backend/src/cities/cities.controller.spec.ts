import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('CitiesController', () => {
  let controller: CitiesController;
  let citiesService: CitiesService;

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

  const mockCitiesService = {
    getCities: jest.fn(() => mockCities),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [{ provide: CitiesService, useValue: mockCitiesService }],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    citiesService = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return cities from the service', () => {
    expect(controller.getCities()).toEqual(mockCities);
    expect(citiesService.getCities).toHaveBeenCalled();
  });

  it('should throw InternalServerErrorException if service throws error', () => {
    (citiesService.getCities as jest.Mock).mockImplementation(() => {
      throw new Error('Retrieving error');
    });

    expect(() => controller.getCities()).toThrow(InternalServerErrorException);
  });
});