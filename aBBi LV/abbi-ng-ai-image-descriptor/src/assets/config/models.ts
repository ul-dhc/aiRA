import { Model } from '../../app/types/model.types'
import { TaskTypeId } from './prompts';

export type ModelProvider = 'OpenAI' | 'Google';
export type ModelId = 'gpt-4.1' | 'gpt-5.4' | 'gemini-3.1-pro-preview' | 'gemini-3.5-flash' | 'gemini-2.5-pro' | 'gemini-2.5-flash';

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

export const MODELS: Model[] = [
  {
    provider: 'OpenAI',
    name: 'GPT-4.1',
    id: 'gpt-4.1',
    description: 'Augstas kvalitātes modelis, radīts, lai sniegtu skaidras, precīzas un labi strukturētas attēlu tekstuālās alternatīvas (alt teksti) īpaši piemērotsi attēlu aprakstu ģenerēšanai.',
    inputPrice: 2.0,
    outputPrice: 8.0,
    rpm: 5000,
    supportedTaskTypes: ['altText', 'transcription'],
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
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei'],
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
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei'],
    url: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash',
    parameters: {
      thinkingLevel: 'low',
      thinkingLevels: ['minimal', 'low', 'medium', 'high'],
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
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei'],
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
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei'],
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
    supportedTaskTypes: ['altText', 'transcription', 'transcriptionBatchTei'],
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
