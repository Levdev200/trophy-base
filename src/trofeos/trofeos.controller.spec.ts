import { Test, TestingModule } from '@nestjs/testing';
import { TrofeosController } from './trofeos.controller';
import { TrofeosService } from './trofeos.service';

describe('TrofeosController', () => {
  let controller: TrofeosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrofeosController],
      providers: [TrofeosService],
    }).compile();

    controller = module.get<TrofeosController>(TrofeosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
