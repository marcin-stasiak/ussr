import { Test, TestingModule } from '@nestjs/testing';

import { RenderersProvider } from './renderers.provider';

describe('RenderersProvider', () => {
  let service: RenderersProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RenderersProvider],
    }).compile();

    service = module.get<RenderersProvider>(RenderersProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
