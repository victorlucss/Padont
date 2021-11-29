import { Test, TestingModule } from '@nestjs/testing';
import { PadsController } from './pads.controller';

describe('PadsController', () => {
  let controller: PadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PadsController],
    }).compile();

    controller = module.get<PadsController>(PadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
