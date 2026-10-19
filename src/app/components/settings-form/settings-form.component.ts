import { MODEL_REVIEW_DATE } from '../../../assets/config/models';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LucideBox, LucideClipboardList, LucideExternalLink, LucideSlidersHorizontal } from '@lucide/angular';

import { PricePerMTokensPipe } from '../../pipes/price-per-m-tokens.pipe';
import { SettingsService } from '../../services/settings.service';
import { GeminiThinkingLevel, Model, OpenAiReasoningEffort } from '../../types/model.types';
import { LanguageCode, TaskTypeId } from '../../../assets/config/prompts';
import { LocaleService } from '../../i18n/locale.service';

@Component({
  selector: 'settings-form',
  imports: [
    FormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTooltipModule,
    LucideBox,
    LucideClipboardList,
    LucideExternalLink,
    LucideSlidersHorizontal,
    PricePerMTokensPipe
  ],
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.scss'
})
export class SettingsFormComponent {
  readonly modelReviewDate = MODEL_REVIEW_DATE;
  settings = inject(SettingsService);
  readonly locale = inject(LocaleService);

  teiEncode = signal<boolean>(false);
  transcribeHeaders = signal<boolean>(true);

  descLengthMax: number = 300;
  descLengthMin: number = 150;
  temperatureMax: number = 2.0;
  temperatureMin: number = 0.0;
  readonly supportedTranslationLanguages: LanguageCode[] = ['lv', 'en', 'dk', 'ee', 'is', 'lt', 'no', 'fi', 'de', 'sv'];

  setDescLength(length: number): void {
    this.settings.updateSelectedDescLength(length);
  }

  setIncludeFilename(event: MatSlideToggleChange): void {
    this.settings.updateIncludeFilename(event.checked);
  }

  setTeiEncode(event: MatSlideToggleChange): void {
    this.settings.updateTeiEncode(event.checked);
  }

  setTranscribeHeaders(event: MatSlideToggleChange): void {
    if (event.checked) {
      this.settings.updateSelectedVariantId('default');
      this.transcribeHeaders.set(true);
    } else {
      this.settings.updateSelectedVariantId('noHeaders');
      this.transcribeHeaders.set(false);
    }
  }

  setTaskVariant(id: string): void {
    this.settings.updateSelectedVariantId(id);
  }

  setModel(model: Model): void {
    this.settings.updateSelectedModel(model);
  }

  setTaskType(type: TaskTypeId): void {
    this.settings.updateSelectedTaskType(type);
  }

  setTemperature(temperature: number): void {
    this.settings.updateSelectedTemperature(temperature);
  }

  setReasoningEffort(reasoningEffort: OpenAiReasoningEffort): void {
    this.settings.updateSelectedReasoningEffort(reasoningEffort);
  }

  setThinkingLevel(thinkingLevel: GeminiThinkingLevel): void {
    this.settings.updateSelectedThinkingLevel(thinkingLevel);
  }

  setBatchSize(size: number): void {
    this.settings.updateBatchSize(size);
  }

  setTablePreserveBlankCells(event: MatSlideToggleChange): void {
    this.settings.updateTablePreserveBlankCells(event.checked);
  }

  setTablePreserveMergedCells(event: MatSlideToggleChange): void {
    this.settings.updateTablePreserveMergedCells(event.checked);
  }

  setTableMarkUnclearText(event: MatSlideToggleChange): void {
    this.settings.updateTableMarkUnclearText(event.checked);
  }

  setTableExportGrouping(value: 'combined' | 'separate'): void {
    this.settings.updateTableExportGrouping(value);
  }

  setTableTranslationLanguage(value: 'original' | LanguageCode): void {
    this.settings.updateTableTranslationLanguage(value);
  }

  setTranscriptionTranslationLanguage(value: 'original' | LanguageCode): void {
    this.settings.updateTranscriptionTranslationLanguage(value);
  }

  modelRecommendation(model: Model): string {
    if (model.id === 'gemini-3.1-pro-preview') {
      return this.locale.locale() === 'lv' ? 'Visaugstākā precizitāte' : 'Highest accuracy';
    }
    if (model.id === 'gemini-3.5-flash') {
      return this.locale.locale() === 'lv' ? 'Ieteicamā izvēle' : 'Recommended';
    }
    if (model.id === 'gpt-5.4') {
      return this.locale.locale() === 'lv' ? 'Jaudīga alternatīva' : 'Strong alternative';
    }
    return '';
  }

}
