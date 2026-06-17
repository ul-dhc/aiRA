import { TaskTypeConfig } from "../../app/types/prompt.types"

import altTextSwedishPrompt from '../prompts/altTextMainSwedish.txt?raw';
import altTextFinnishPrompt from '../prompts/altTextMainFinnish.txt?raw';
import altTextEnglishPrompt from '../prompts/altTextMainEnglish.txt?raw';
import altTextLatvianPrompt from '../prompts/altTextMainLatvian.txt?raw';
import altTextFilenameSwedishPrompt from '../prompts/altTextFilenameSwedish.txt?raw';
import altTextFilenameFinnishPrompt from '../prompts/altTextFilenameFinnish.txt?raw';
import altTextFilenameEnglishPrompt from '../prompts/altTextFilenameEnglish.txt?raw';
import altTextFilenameLatvianPrompt from '../prompts/altTextFilenameLatvian.txt?raw';
import altTextTranslateSwedishPrompt from '../prompts/altTextTranslateSwedish.txt?raw';
import altTextTranslateFinnishPrompt from '../prompts/altTextTranslateFinnish.txt?raw';
import altTextTranslateEnglishPrompt from '../prompts/altTextTranslateEnglish.txt?raw';
import altTextTranslateLatvianPrompt from '../prompts/altTextTranslateLatvian.txt?raw';
import transcriptionIncludeHeadersPrompt from '../prompts/transcriptionIncludeHeaders.txt?raw';
import transcriptionIgnoreHeadersPrompt from '../prompts/transcriptionIgnoreHeaders.txt?raw';
import transcriptionTeiPrompt from '../prompts/transcriptionTei.txt?raw';
import transcriptionBatchTeiPrompt from '../prompts/transcriptionBatchTei.txt?raw';

/*
console.log(
  '[DEBUG] transcriptionBatchTeiPrompt loaded:',
  transcriptionBatchTeiPrompt.slice(0, 2000)
);
*/

export type TaskTypeId = 'altText' | 'transcription' | 'transcriptionBatchTei';
export type LanguageCode = 'lv' | 'en' | 'sv' | 'fi' ;

export const TASK_CONFIGS: TaskTypeConfig[] = [
  {
    taskType: 'altText',
    label: 'Attēlu aprakstu izveide',
    taskDescription: 'Attēlu tekstuālās alternatīvas (alt text) īsu aprakstu izveide ar katra attēla atsevišķu apstrādi.',
    nouns: {
      singular: 'tekstuālā alternatīva',
      plural: 'tekstuālās alternatīvas',
	pakuz: 'aprakstus',
	s: 'apraksts',
	sakuz: 'aprakstu'
    },
    defaultModel: 'gpt-4.1',
    variants: [
      {
        id: 'lv',
        label: 'Latviešu',
        languageCode: 'lv',
        prompt: altTextLatvianPrompt
      },
      {
        id: 'en',
        label: 'Angļu',
        languageCode: 'en',
        prompt: altTextEnglishPrompt
      },
      {
        id: 'sv',
        label: 'Zviedru',
        languageCode: 'sv',
        prompt: altTextSwedishPrompt
      },
      {
        id: 'fi',
        label: 'Somu',
        languageCode: 'fi',
        prompt: altTextFinnishPrompt
      },

    ],
    helpers: {
      filenamePrompt: {
        sv: altTextFilenameSwedishPrompt,
        fi: altTextFilenameFinnishPrompt,
        en: altTextFilenameEnglishPrompt,
        lv: altTextFilenameLatvianPrompt
      },
      translatePrompt: {
        sv: altTextTranslateSwedishPrompt,
        fi: altTextTranslateFinnishPrompt,
        en: altTextTranslateEnglishPrompt,
        lv: altTextTranslateLatvianPrompt
      },
    },
  },
  {
    taskType: 'transcription',
    label: 'Atšifrēt',
    taskDescription: 'Izvilkt tekstu no attēliem pa vienam ar iespēju to vēlāk iekodēt TEI XML kodā.',
    nouns: {
      singular: 'atšifrējums',
      plural: 'atšifrējumi',
	pakuz: 'atšifrējumus',
	s: 'atšifrējums',
	sakuz: 'atšifrējumu'
    },
    defaultModel: 'gemini-3.1-pro-preview',
    variants: [
      {
        id: 'default',
        label: 'Iekļaut galvenes un kājenes',
        prompt: transcriptionIncludeHeadersPrompt
      },
      { id: 'noHeaders',
        label: 'Ignorēt galvenes, kājenes un lapu numurus',
        prompt: transcriptionIgnoreHeadersPrompt
      },
    ],
    helpers: {
      teiEncodePrompt: transcriptionTeiPrompt
    }
  },
  {
    taskType: 'transcriptionBatchTei',
    label: 'Atšifrēt + TEI iekodēt (pa grupām)',
    taskDescription: 'Izvilkt tekstu no vairākiem attēliem reizē un iekodēt rezultātu TEI XML kodā.',
    nouns: {
      singular: 'TEI atšifrējums',
      plural: 'TEI atšifrējumi',
	pakuz: 'atšifrējumus un iekodējumus',
	s: 'atšifrējums un iekodējums',
	sakuz: 'atšifrējumu un iekodējumu'
    },
    defaultModel: 'gemini-3.1-pro-preview',
    variants: [
      {
        id: 'default',
        label: 'TEI body (batched, no running headers)',
        prompt: transcriptionBatchTeiPrompt
      }
    ]
  }
] as const;

// Map of task types for lookups
export const TASK_TYPES_BY_ID = Object.fromEntries(
  TASK_CONFIGS.map(t => [t.taskType, t])
) as Record<TaskTypeId, TaskTypeConfig>;
