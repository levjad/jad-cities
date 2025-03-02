import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CitiesService } from './cities/cities.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: CitiesService,
          useValue: { getCities: () => of([]) },
        },
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Cities');
  });

  it('should toggle theme', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const initialTheme = app.currentTheme();
    app.toggleTheme();
    expect(app.currentTheme()).not.toBe(initialTheme);
    app.toggleTheme();
    expect(app.currentTheme()).toBe(initialTheme);
  });

  it('should use saved theme', () => {
    localStorage.clear();
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.ngOnInit();
    fixture.detectChanges();

    const savedTheme = localStorage.getItem('theme') || 'Does not find theme';
    expect(app.currentTheme()).toBe(savedTheme);
  });
});
