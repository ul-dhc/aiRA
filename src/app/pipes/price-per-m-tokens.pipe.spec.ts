import { PricePerMTokens } from '../types/model.types';
import { PricePerMTokensPipe } from './price-per-m-tokens.pipe';

describe('PricePerMTokensPipe localization', () => {
  const pipe = new PricePerMTokensPipe();

  it('translates flat and tiered prices without changing their amounts or thresholds', () => {
    expect(pipe.transform(2, 'en')).toEqual(['$2.00 / 1M tokens']);
    const tiered: PricePerMTokens = { tiers: [{ upToTokens: 200000, per1M: 2 }, { upToTokens: null, per1M: 4 }] };
    expect(pipe.transform(tiered, 'en')).toEqual([
      '$2.00 / 1M tokens, for prompts <= 200k tokens',
      '$4.00 / 1M tokens, for prompts > 200k tokens'
    ]);
    expect(pipe.transform(2, 'lv')).toEqual(['$2.00 / 1M tekstvienībām']);
    expect(pipe.transform(null, 'en')).toEqual(['–']);
  });
});
