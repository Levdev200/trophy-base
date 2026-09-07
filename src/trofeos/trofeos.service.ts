import { Injectable } from '@nestjs/common';
import { CreateTrofeoDto } from './dto/create-trofeo.dto';
import { UpdateTrofeoDto } from './dto/update-trofeo.dto';

@Injectable()
export class TrofeosService {
  create(createTrofeoDto: CreateTrofeoDto) {
    return 'This action adds a new trofeo';
  }

  findAll() {
    return `This action returns all trofeos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trofeo`;
  }

  update(id: number, updateTrofeoDto: UpdateTrofeoDto) {
    return `This action updates a #${id} trofeo`;
  }

  remove(id: number) {
    return `This action removes a #${id} trofeo`;
  }
}
