import { Test, TestingModule } from '@nestjs/testing';
import { PadsService } from './pads.service';

describe('PadsService', () => {
  let service: PadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PadsService],
    }).compile();

    service = module.get<PadsService>(PadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
