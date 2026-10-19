import { MODELS, gemini38Pricing } from './models';
import { isTemperatureSupportedForModel } from '../../app/utils/model-parameters';

describe('Current vision model configuration', () => {
  it('uses supported reasoning settings for GPT-6 and Gemini 3.8', () => {
    for (const id of ['gpt-6.1-sol', 'gpt-6-astra']) {
      const model = MODELS.find(model => model.id === id)!;
      expect(model.parameters?.reasoningEfforts).not.toContain('none');
      expect(model.parameters?.reasoningEfforts).not.toContain('minimal');
      expect(isTemperatureSupportedForModel(model)).toBeFalse();
    }
    const flash = MODELS.find(model => model.id === 'gemini-3.8-flash')!;
    expect(flash.parameters?.thinkingLevels).not.toContain('minimal');
    expect(flash.supportedTaskTypes).toContain('transcriptionBatchTei');
  });

  it('switches Gemini 3.8 prices at the published UTC boundary', () => {
    expect(gemini38Pricing(new Date('2026-12-31T23:59:59Z'))).toEqual({ inputPrice: 0.75, outputPrice: 3.75 });
    expect(gemini38Pricing(new Date('2027-01-01T00:00:00Z'))).toEqual({ inputPrice: 1.5, outputPrice: 7.5 });
  });
});
