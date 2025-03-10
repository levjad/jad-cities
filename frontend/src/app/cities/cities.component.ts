import { Component, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CitiesService } from './cities.service';
import { City } from '../../shared/types/cities.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  standalone: true,
  imports: [
    DecimalPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesComponent implements OnInit {
  allCities = signal<City[]>([]);
  filterText = signal<string>('');
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  filteredCities = computed(() => {
    const filter = this.filterText().toLowerCase();
    return this.allCities().filter((city) => {
      return (
        city.name.toLowerCase().includes(filter) ||
        city.country.toLowerCase().includes(filter) ||
        city.continent.toLowerCase().includes(filter)
      );
    });
  });

  constructor(private citiesService: CitiesService) {}

  ngOnInit(): void {
    this.citiesService.getCities().subscribe({
      next: (cities) => {
        this.allCities.set(cities);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error);
        this.loading.set(false);
      },
    });
  }

  updateFilter(event: Event) {
    this.filterText.set((event.target as HTMLInputElement).value);
  }

  getGoogleMapsUrl(city: City, landmark?: string): string {
    if (landmark) {
      // If a landmark is provided, use it in the search query
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${landmark}, ${city.name}, ${city.country}`
      )}`;
    } else {
      // If no landmark, use latitude and longitude
      return `https://www.google.com/maps/place/${city.latitude},${city.longitude}`;
    }
  }
}
