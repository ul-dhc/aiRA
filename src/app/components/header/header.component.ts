import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  computed,
  inject,
  signal
} from '@angular/core';
import { LucideInfo, LucideMoon, LucideSun } from '@lucide/angular';
import { LocaleService } from '../../i18n/locale.service';
import { UiLocale } from '../../i18n/translations';

type ColorTheme = 'light' | 'dark';

@Component({
  selector: 'app-header',
  imports: [
    LucideInfo,
    LucideMoon,
    LucideSun
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly document = inject(DOCUMENT);
  private readonly themeStorageKey = 'aira-theme';
  private readonly textScaleStorageKey = 'aira-text-scale';
  readonly locale = inject(LocaleService);

  @Input() showLanguageButton = true;

  showInfoOverlay = signal(false);
  openInfoSection = signal<string | null>('about');
  isDarkTheme = signal(false);
  textScale = signal(100);

  themeActionLabel = computed(() =>
    this.isDarkTheme()
      ? this.locale.t('header.toLight')
      : this.locale.t('header.toDark')
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
    let savedTextScale = 100;
    try {
      savedTextScale = Number(browserWindow.localStorage.getItem(this.textScaleStorageKey));
    } catch {
      savedTextScale = 100;
    }
    if ([90, 100, 110, 120].includes(savedTextScale)) {
      this.applyTextScale(savedTextScale, false);
    }
    this.applyLocationHash();
  }

  @HostListener('window:hashchange')
  @HostListener('window:popstate')
  onLocationChange(): void {
    this.applyLocationHash();
  }

  toggleTheme(): void {
  const newTheme: ColorTheme =
    this.isDarkTheme() ? 'light' : 'dark';

  const root = this.document.documentElement;
  const browserWindow = this.document.defaultView;

  if (!browserWindow) {
    this.applyTheme(newTheme);
    return;
  }

  root.classList.add('theme-transition');

  browserWindow.requestAnimationFrame(() => {
    this.applyTheme(newTheme);

    browserWindow.setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 380);
  });
}

  openInfoOverlay(event: Event): void {
    event.preventDefault();
    this.showInfoOverlay.set(true);
    this.document.body.style.overflow = 'hidden';
    this.replaceHash('info');
  }

  closeInfoOverlay(): void {
    this.showInfoOverlay.set(false);
    this.document.body.style.overflow = '';
    if (this.document.defaultView?.location.hash === '#info') {
      this.replaceHash(this.locale.locale());
    }
  }

  setLanguage(locale: UiLocale): void {
    this.locale.setLocale(locale);
    this.replaceHash(locale);
  }

  changeTextScale(change: number): void {
    const nextScale = Math.min(120, Math.max(90, this.textScale() + change));
    this.applyTextScale(nextScale);
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

  private applyTextScale(scale: number, savePreference = true): void {
    this.textScale.set(scale);
    this.document.documentElement.style.fontSize = `${scale}%`;

    if (savePreference) {
      try {
        this.document.defaultView?.localStorage.setItem(
          this.textScaleStorageKey,
          String(scale)
        );
      } catch {
        // Text scaling still works if browser storage is unavailable.
      }
    }
  }

  private applyLocationHash(): void {
    const hash = this.document.defaultView?.location.hash.toLowerCase();
    if (hash === '#en' || hash === '#lv') {
      this.locale.setLocale(hash.slice(1) as UiLocale);
      this.showInfoOverlay.set(false);
      this.document.body.style.overflow = '';
    } else if (hash === '#info') {
      this.showInfoOverlay.set(true);
      this.document.body.style.overflow = 'hidden';
    }
  }

  private replaceHash(hash: 'info' | UiLocale): void {
    const view = this.document.defaultView;
    if (!view) return;
    const url = `${view.location.pathname}${view.location.search}#${hash}`;
    view.history.replaceState(view.history.state, '', url);
  }
}
