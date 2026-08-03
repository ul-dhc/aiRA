import { DOCUMENT } from '@angular/common';
import {
  Component,
  Input,
  computed,
  inject,
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

type ColorTheme = 'light' | 'dark';

@Component({
  selector: 'app-header',
  imports: [
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly document = inject(DOCUMENT);
  private readonly themeStorageKey = 'aira-theme';

  @Input() showLanguageButton = true;

  showInfoOverlay = signal(false);
  openInfoSection = signal<string | null>('about');
  isDarkTheme = signal(false);

  themeActionLabel = computed(() =>
    this.isDarkTheme()
      ? 'Pārslēgt uz gaišo režīmu'
      : 'Pārslēgt uz tumšo režīmu'
  );

  constructor() {
    const browserWindow = this.document.defaultView;

    if (!browserWindow) {
      return;
    }

    let savedTheme: string | null = null;

    try {
      savedTheme = browserWindow.localStorage.getItem(
        this.themeStorageKey
      );
    } catch {
      savedTheme = null;
    }

    const preferredTheme: ColorTheme =
      browserWindow.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

    const initialTheme: ColorTheme =
      savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : preferredTheme;

    this.applyTheme(initialTheme, false);
  }

  toggleTheme(): void {
    const newTheme: ColorTheme =
      this.isDarkTheme() ? 'light' : 'dark';

    this.applyTheme(newTheme);
  }

  openInfoOverlay(event: Event): void {
    event.preventDefault();
    this.showInfoOverlay.set(true);
    this.document.body.style.overflow = 'hidden';
  }

  closeInfoOverlay(): void {
    this.showInfoOverlay.set(false);
    this.document.body.style.overflow = '';
  }

  toggleInfoSection(section: string): void {
    this.openInfoSection.update(current =>
      current === section ? null : section
    );
  }

  private applyTheme(
    theme: ColorTheme,
    savePreference = true
  ): void {
    const root = this.document.documentElement;

    root.classList.toggle('theme-dark', theme === 'dark');
    root.classList.toggle('theme-light', theme === 'light');
    root.style.colorScheme = theme;

    this.isDarkTheme.set(theme === 'dark');

    if (!savePreference) {
      return;
    }

    try {
      this.document.defaultView?.localStorage.setItem(
        this.themeStorageKey,
        theme
      );
    } catch {
      // The theme still works if browser storage is unavailable.
    }
  }
}
