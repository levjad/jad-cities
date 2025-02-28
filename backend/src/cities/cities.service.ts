import { Injectable } from '@nestjs/common';
import * as citiesData from '../../../data/cities.json';


@Injectable()
export class CitiesService {
    getCities(): City[] {
        return (citiesData as CitiesData).cities;
    }
}