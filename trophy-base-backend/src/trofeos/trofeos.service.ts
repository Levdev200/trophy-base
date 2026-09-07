import { Injectable } from '@nestjs/common';
import { CreateTrofeoDto } from './dto/create-trofeo.dto';
import { UpdateTrofeoDto } from './dto/update-trofeo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrofeosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTrofeoDto: CreateTrofeoDto) {
    return this.prisma.trofeo.create({ data: createTrofeoDto });
  }

  findAll() {
    return this.prisma.trofeo.findMany();
  }

  findOne(id: number) {
    return this.prisma.trofeo.findUnique({ where: { id } });
  }

  update(id: number, updateTrofeoDto: UpdateTrofeoDto) {
    return this.prisma.trofeo.update({
      where: { id },
      data: updateTrofeoDto,
    });
  }

  remove(id: number) {
    return this.prisma.trofeo.delete({ where: { id } });
  }
}
