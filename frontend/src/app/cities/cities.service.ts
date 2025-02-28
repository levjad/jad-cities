import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../../shared/types/cities.interface'

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private apiUrl = 'http://localhost:3000/cities'; // Adjust URL

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }
}
