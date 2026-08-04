import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';

import { TRANSLATIONS, UiLocale } from './translations';

const STORAGE_KEY = 'aira-ui-locale';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly document = inject(DOCUMENT);
  readonly locale = signal<UiLocale>(this.readInitialLocale());
  readonly otherLocale = computed<UiLocale>(() => this.locale() === 'lv' ? 'en' : 'lv');

  constructor() {
    this.document.documentElement.lang = this.locale();
  }

  setLocale(locale: UiLocale): void {
    if (locale === this.locale()) return;
    this.locale.set(locale);
    this.document.documentElement.lang = locale;
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Runtime switching still works when browser storage is unavailable.
    }
  }

  toggle(): void {
    this.setLocale(this.otherLocale());
  }

  t(key: string): string {
    return TRANSLATIONS[this.locale()][key]
      ?? TRANSLATIONS.lv[key]
      ?? key;
  }

  taskLabel(taskType: string): string {
    const labels: Record<string, [string, string]> = {
      altText: ['Attēlu aprakstu izveide', 'Generate alt text'],
      transcription: ['Atšifrēt', 'Transcribe'],
      transcriptionBatchTei: ['Atšifrēt + TEI iekodēt (pa grupām)', 'Transcribe + TEI encode (batched)']
    };
    return labels[taskType]?.[this.locale() === 'lv' ? 0 : 1] ?? taskType;
  }

  taskDescription(taskType: string): string {
    const descriptions: Record<string, [string, string]> = {
      altText: [
        'Attēlu tekstuālās alternatīvas (alt text) īsu aprakstu izveide ar katra attēla atsevišķu apstrādi.',
        'Generate concise, accessible alt text descriptions, processing each image individually.'
      ],
      transcription: [
        'Izvilkt tekstu no attēliem pa vienam ar iespēju to vēlāk iekodēt TEI XML kodā.',
        'Transcribe text from images one by one and optionally encode each transcription as TEI XML.'
      ],
      transcriptionBatchTei: [
        'Izvilkt tekstu no vairākiem attēliem reizē un iekodēt rezultātu TEI XML kodā.',
        'Transcribe multiple images in batches and encode the results as TEI XML.'
      ]
    };
    return descriptions[taskType]?.[this.locale() === 'lv' ? 0 : 1] ?? '';
  }

  languageLabel(code: string): string {
    const names: Record<string, [string, string]> = {
      lv: ['Latviešu', 'Latvian'], en: ['Angļu', 'English'], dk: ['Dāņu', 'Danish'],
      ee: ['Igauņu', 'Estonian'], fi: ['Somu', 'Finnish'], de: ['Vācu', 'German'],
      is: ['Islandiešu', 'Icelandic'], lt: ['Lietuviešu', 'Lithuanian'],
      no: ['Norvēģu', 'Norwegian'], sv: ['Zviedru', 'Swedish']
    };
    return names[code]?.[this.locale() === 'lv' ? 0 : 1] ?? code;
  }

  private readInitialLocale(): UiLocale {
    try {
      const saved = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      if (saved === 'lv' || saved === 'en') return saved;
    } catch {
      // Fall through to browser preference.
    }

    const browserLanguage = this.document.defaultView?.navigator.language.toLowerCase() ?? 'lv';
    return browserLanguage.startsWith('en') ? 'en' : 'lv';
  }
}
