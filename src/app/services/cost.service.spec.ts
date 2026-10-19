import { CostService } from './cost.service';
import { MODELS } from '../../assets/config/models';

describe('Long-context model cost', () => {
  it('uses input length to choose both input and output price tiers', () => {
    const service = new CostService();
    const model = MODELS.find(model => model.id === 'gpt-6.1-sol')!;
    // A long input with a short answer still attracts the higher output rate.
    expect(service.updateCostFromResponse(model, { inputTokens: 300000, outputTokens: 1000 })).toBeCloseTo(1.215, 6);
    expect(service.updateCostFromResponse(model, { inputTokens: 1000, outputTokens: 300000 })).toBeCloseTo(3.002, 6);
  });
});
