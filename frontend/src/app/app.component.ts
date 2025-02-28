import { Component, OnInit, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { CitiesComponent } from './cities/cities.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CitiesComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  currentTheme = signal<string>('light'); // Default theme

  constructor() {
    effect(() => {
      this.setTheme(this.currentTheme());
      localStorage.setItem('theme', this.currentTheme());
    });
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.currentTheme.set('dark');
      }
    }
  }

  toggleTheme() {
    this.currentTheme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
