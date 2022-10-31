import { Test, TestingModule } from '@nestjs/testing';

import { BrowserProvider } from './browser.provider';

describe('BrowserProvider', () => {
  let service: BrowserProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrowserProvider],
    }).compile();

    service = module.get<BrowserProvider>(BrowserProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
