import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { MODELS } from '../../assets/config/models';
import { TASK_CONFIGS } from '../../assets/config/prompts';
import { SettingsService } from '../services/settings.service';
import { LocaleService } from './locale.service';
import { TRANSLATIONS } from './translations';

describe('English interface coverage', () => {
  let document: Document;
  let locale: LocaleService;

  beforeEach(() => {
    document = window.document.implementation.createHTMLDocument();
    document.head.innerHTML = '<title></title><meta name="description"><meta property="og:title"><meta property="og:locale"><meta name="twitter:description">';
    TestBed.configureTestingModule({ providers: [{ provide: DOCUMENT, useValue: document }] });
    locale = TestBed.inject(LocaleService);
  });

  it('provides a non-empty English translation for every Latvian key and configured model', () => {
    expect(Object.keys(TRANSLATIONS.en).sort()).toEqual(Object.keys(TRANSLATIONS.lv).sort());
    for (const value of Object.values(TRANSLATIONS.en)) expect(value.trim()).not.toBe('');
    for (const model of MODELS) expect(TRANSLATIONS.en[`model.${model.id}`]).toBeTruthy();
  });

  it('updates the document language, title, and metadata in both directions', () => {
    locale.setLocale('en');
    TestBed.tick();
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toContain('handwriting transcription');
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(document.title);
    expect(document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe(TRANSLATIONS.en['meta.description']);
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('en_GB');
    locale.setLocale('lv');
    TestBed.tick();
    expect(document.title).toBe(TRANSLATIONS.lv['meta.title']);
    expect(document.documentElement.lang).toBe('lv');
  });

  it('translates stored batch errors when switching languages and preserves provider messages', () => {
    locale.setLocale('en');
    expect(locale.localizeMessage(TRANSLATIONS.lv['error.userCancelled'])).toBe('Cancelled by the user.');
    expect(locale.localizeMessage('Provider response: quota exceeded')).toBe('Provider response: quota exceeded');
    locale.setLocale('lv');
    expect(locale.localizeMessage('Cancelled by the user.')).toBe(TRANSLATIONS.lv['error.userCancelled']);
  });

  it('switches result nouns without changing task or prompt selection', () => {
    const settings = TestBed.inject(SettingsService);
    for (const task of TASK_CONFIGS) {
      settings.selectedTaskType.set(task.taskType);
      const prompt = settings.selectedVariant().prompt;
      locale.setLocale('en');
      expect(settings.taskNouns().s).not.toMatch(/[āčēģīķļņšūž]/i);
      expect(settings.selectedTaskType()).toBe(task.taskType);
      expect(settings.selectedVariant().prompt).toBe(prompt);
      locale.setLocale('lv');
      expect(settings.taskNouns()).toEqual(task.nouns);
    }
  });
});
