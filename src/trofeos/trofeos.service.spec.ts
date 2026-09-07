import { Test, TestingModule } from '@nestjs/testing';
import { TrofeosService } from './trofeos.service';

describe('TrofeosService', () => {
  let service: TrofeosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrofeosService],
    }).compile();

    service = module.get<TrofeosService>(TrofeosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
