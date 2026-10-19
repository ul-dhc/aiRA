import { Model } from '../../app/types/model.types'
import { TaskTypeId } from './prompts';

export type ModelProvider = 'OpenAI' | 'Google';
export type ModelId = 'gpt-6.1-sol' | 'gpt-6-luna' | 'gpt-6-astra' | 'gemini-3.8-flash' | 'gemini-3.5-flash-lite' | 'gpt-4.1' | 'gpt-5.4' | 'gemini-3.1-pro-preview' | 'gemini-3.5-flash' | 'gemini-2.5-pro' | 'gemini-2.5-flash';

// provider = name of model creator
// name = display name of the model
// id = the API id or name of the model
// inputPrice = Either a flat price ($/1M tokens in prompt) or a tiered
//              price depending on token count.
// outputPrice = Either a flat price ($/1M tokens in model output) or a
//               tiered price depending on token count.
// rpm = max requests per minute the model accepts at current usage tier
// supportedTaskTypes = array of task types the model can be used for
// parameters = an object with model parameters:
//     maxImageShortsidePx = (optional) max supported image short side
//                           length in pixels, set to null for no limit,
//                           defaults to 768 if undefined
//     imageDetail = (optional, OpenAI only)
//     mediaResolution = (optional, Google Gemini only)
//     reasoningEffort = (optional, required for OpenAI reasoning models)
//                       reasoning effort constraint for reasoning
//                       models, supported values are `none`, `minimal`,
//                       `low`, `medium`, `high` and `xhigh` depending on model
//     reasoningEfforts = (optional) selectable list of supported reasoning
//                        effort values
//     reasoningSupportsTemperature = (optional) when false, temperature is
//                                    only supported with provider-specific
//                                    "no reasoning/thinking" settings;
//                                    defaults to true if undefined
//     thinkingBudget = (optional, Google Gemini only, required for 2.5)
//     thinkingLevel = (optional, Google Gemini only, required for 3)
//     thinkingLevels = (optional) selectable list of supported thinking levels

// OpenAI Responses API reference: https://platform.openai.com/docs/api-reference/responses/create
// Google GenAI SDK for TypeScript and JavaScript: https://googleapis.github.io/js-genai/release_docs/index.html

// Documentation review, not a claim of benchmark or authenticated API testing.
export const MODEL_REVIEW_DATE = '2026-10-19';

// Google's published introductory price changes on 1 January 2027.
export function gemini38Pricing(date = new Date()): { inputPrice: number; outputPrice: number } {
  return date.getTime() < Date.UTC(2027, 0, 1)
    ? { inputPrice: 0.75, outputPrice: 3.75 }
    : { inputPrice: 1.50, outputPrice: 7.50 };
}

export const MODELS: Model[] = [
  {
    provider: 'OpenAI',
    name: 'GPT-6.1 Sol',
    id: 'gpt-6.1-sol',
    description: "Jaunākās paaudzes modelis sarežģītiem uzdevumiem, kas līdzsvaro iespējas un izmaksas. Atbalsta attēlu ievadi un teksta izvadi.",
    inputPrice: { tiers: [{ upToTokens: 272000, per1M: 2 }, { upToTokens: null, per1M: 4 }] },
    outputPrice: { tiers: [{ upToTokens: 272000, per1M: 10 }, { upToTokens: null, per1M: 15.0 }] },
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei', 'tableDigitization'],
    url: 'https://developers.openai.com/api/docs/models/gpt-6.1-sol',
    parameters: {
      imageDetail: 'high', maxImageShortsidePx: null,
      reasoningEffort: 'low',
      reasoningEfforts: ['low', 'medium', 'high', 'xhigh'],
      reasoningSupportsTemperature: false
    },
    supportsFilesApi: true
  },
  {
    provider: 'OpenAI',
    name: 'GPT-6 Luna',
    id: 'gpt-6-luna',
    description: "Ekonomisks jaunākās paaudzes modelis vienkāršākiem un liela apjoma uzdevumiem. Atbalsta attēlu ievadi un teksta izvadi.",
    inputPrice: { tiers: [{ upToTokens: 272000, per1M: 0.1 }, { upToTokens: null, per1M: 0.2 }] },
    outputPrice: { tiers: [{ upToTokens: 272000, per1M: 0.5 }, { upToTokens: null, per1M: 0.75 }] },
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei', 'tableDigitization'],
    url: 'https://developers.openai.com/api/docs/models/gpt-6-luna',
    parameters: {
      imageDetail: 'high', maxImageShortsidePx: null,
      reasoningEffort: 'none',
      reasoningEfforts: ['none', 'low', 'medium', 'high', 'xhigh'],
      reasoningSupportsTemperature: false
    },
    supportsFilesApi: true
  },
  {
    provider: 'OpenAI',
    name: 'GPT-6 Astra',
    id: 'gpt-6-astra',
    description: "Jaudīgs jaunākās paaudzes modelis sarežģītiem uzdevumiem ar augstāku lietošanas cenu. Atbalsta attēlu ievadi un teksta izvadi.",
    inputPrice: { tiers: [{ upToTokens: 272000, per1M: 10 }, { upToTokens: null, per1M: 20 }] },
    outputPrice: { tiers: [{ upToTokens: 272000, per1M: 50 }, { upToTokens: null, per1M: 75.0 }] },
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei', 'tableDigitization'],
    url: 'https://developers.openai.com/api/docs/models/gpt-6-astra',
    parameters: {
      imageDetail: 'high', maxImageShortsidePx: null,
      reasoningEffort: 'low',
      reasoningEfforts: ['low', 'medium', 'high', 'xhigh'],
      reasoningSupportsTemperature: false
    },
    supportsFilesApi: true
  },
  {
    provider: 'Google',
    name: 'Gemini 3.8 Flash',
    id: 'gemini-3.8-flash',
    description: "Jaunākās paaudzes Flash modelis sarežģītiem multimodāliem uzdevumiem. Atbalsta attēlu ievadi un teksta izvadi.",
    ...gemini38Pricing(),
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei', 'tableDigitization'],
    url: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash',
    parameters: {
      mediaResolution: 'high', maxImageShortsidePx: null,
      thinkingLevel: 'low',
      thinkingLevels: ['low', 'medium', 'high'],
      reasoningSupportsTemperature: false
    },
    supportsFilesApi: true
  },
  {
    provider: 'Google',
    name: 'Gemini 3.5 Flash-Lite',
    id: 'gemini-3.5-flash-lite',
    description: "Ātrs un ekonomisks modelis dokumentu apstrādei un vienkāršai datu iegūšanai lielā apjomā. Atbalsta attēlu ievadi un teksta izvadi.",
    inputPrice: 0.3,
    outputPrice: 2.5,
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei', 'tableDigitization'],
    url: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite',
    parameters: {
      mediaResolution: 'high', maxImageShortsidePx: null,
      thinkingLevel: 'minimal',
      thinkingLevels: ['minimal', 'low', 'medium', 'high'],
      reasoningSupportsTemperature: false
    },
    supportsFilesApi: true
  },

  {
    provider: 'OpenAI',
    name: 'GPT-4.1',
    id: 'gpt-4.1',
    description: 'Augstas kvalitātes modelis, radīts, lai sniegtu skaidras, precīzas un labi strukturētas attēlu tekstuālās alternatīvas (alt teksti) īpaši piemērotsi attēlu aprakstu ģenerēšanai.',
    inputPrice: 2.0,
    outputPrice: 8.0,
    rpm: 5000,
    supportedTaskTypes: ['altText', 'transcription', 'tableDigitization'],
    url: 'https://developers.openai.com/api/docs/models/gpt-4.1',
    parameters: {
      imageDetail: 'high'
    }
  },
  {
    provider: 'OpenAI',
    name: 'GPT-5.4',
    id: 'gpt-5.4',
    description: 'Spēcīgs modelis, optimizēts īpaši kvalitatīvām atbildēm, labi piemērots sarežģītiem attēliem.',
    inputPrice: { tiers: [{ upToTokens: 272000, per1M: 2.50 }, { upToTokens: null, per1M: 5.00 }] },
    outputPrice: { tiers: [{ upToTokens: 272000, per1M: 15.00 }, { upToTokens: null, per1M: 22.50 }] },
    rpm: 5000,
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei', 'tableDigitization'],
    url: 'https://developers.openai.com/api/docs/models/gpt-5.4',
    parameters: {
      imageDetail: 'original',
      maxImageShortsidePx: null,
      reasoningEffort: 'none',
      reasoningEfforts: ['none', 'low', 'medium', 'high', 'xhigh'],
      reasoningSupportsTemperature: false
    },
    supportsFilesApi: true
  },
  {
    provider: 'Google',
    name: 'Gemini 3.5 Flash',
    id: 'gemini-3.5-flash',
    description: 'Ātrāka un ekonomiskāka alternatīva Gemini 3.1 Pro modelim; 3.5 Flash spēj atšifrēt tekstus, tai skaitā rokrakstā rakstītus, kvalitātē, kas līdzinās pro modelim.',
    inputPrice: 1.5,
    outputPrice: 9.0,
    rpm: 1000,
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei', 'tableDigitization'],
    url: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash',
    parameters: {
      thinkingLevel: 'low',
      thinkingLevels: ['minimal', 'low', 'medium', 'high'],
      // Gemini 3.5 migration guidance recommends omitting sampling
      // parameters such as temperature when thinking is enabled.
      reasoningSupportsTemperature: false,
      maxImageShortsidePx: null,
      mediaResolution: 'high'
    },
    supportsFilesApi: true
  },
  {
    provider: 'Google',
    name: 'Gemini 3.1 Pro Preview',
    id: 'gemini-3.1-pro-preview',
    description: 'Visprecīzākais modelis atšifrēšanai, īpaši piemērotts rokrakstā rakstīto tekstu atpazīšanai vislabākā izvēle gadījumiem, kad īpaši svarīga ir atšifrējuma kvalitāte.',
    inputPrice: { tiers: [{ upToTokens: 200000, per1M: 2.00 }, { upToTokens: null, per1M: 4.00 }] },
    outputPrice: { tiers: [{ upToTokens: 200000, per1M: 12.00 }, { upToTokens: null, per1M: 18.00 }] },
    rpm: 25,
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei', 'tableDigitization'],
    url: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview',
    parameters: {
      thinkingLevel: 'low',
      thinkingLevels: ['low', 'medium', 'high'],
      maxImageShortsidePx: null,
      mediaResolution: 'high'
    },
    supportsFilesApi: true
  },
  {
    provider: 'Google',
    name: 'Gemini 2.5 Pro',
    id: 'gemini-2.5-pro',
    description: 'Augstas kvalitātes vispārējam lietojumam paredzēts modelis , spējīgs gan veidot attēlu tekstuālās alternatīvas (alt texts), gan atšifrējumus ar augstu precizitāti. Nesasniedz Gemini 3 Pro līmeni,  darbā ar rokrakstu atpazīšanu.',
    inputPrice: { tiers: [{ upToTokens: 200000, per1M: 1.25 }, { upToTokens: null, per1M: 2.50 }] },
    outputPrice: { tiers: [{ upToTokens: 200000, per1M: 10.00 }, { upToTokens: null, per1M: 15.00 }] },
    rpm: 150,
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei', 'tableDigitization'],
    url: 'https://ai.google.dev/gemini-api/docs/models#gemini-2.5-pro',
    parameters: {
      thinkingBudget: 512,
      maxImageShortsidePx: null,
      mediaResolution: 'high'
    },
    supportsFilesApi: true
  },
  {
    provider: 'Google',
    name: 'Gemini 2.5 Flash',
    id: 'gemini-2.5-flash',
    description: 'Ātrs un ekonomiski izdevīgs modelis liela apjoma attēlu tekstuālās alternatīvu (alt texts) un atšifrēšanas uzdevumiem; modelim ir laba vispārējā precizitāte ar izteikti jaudīgu ātrumu.',
    inputPrice: 0.30,
    outputPrice: 2.50,
    rpm: 1000,
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei', 'tableDigitization'],
    url: 'https://ai.google.dev/gemini-api/docs/models#gemini-2.5-flash',
    parameters: {
      thinkingBudget: 512,
      maxImageShortsidePx: null,
      mediaResolution: 'high'
    },
    supportsFilesApi: true
  }
];

export function getModelsForTaskType(taskType: TaskTypeId): Model[] {
  return MODELS.filter(m => m.supportedTaskTypes.includes(taskType));
}

export function isModelAllowedForTaskType(modelId: ModelId, taskType: TaskTypeId): boolean {
  return MODELS.some(m => m.id === modelId && m.supportedTaskTypes.includes(taskType));
}
