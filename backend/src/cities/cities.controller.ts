import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    @Get()
    getCities(): City[] {
        try {
            return this.citiesService.getCities();
        } catch (error) {
            console.error('Error retrieving cities:', error);
            throw new InternalServerErrorException('Failed to retrieve cities. Please try again later.');
        }
    }

}