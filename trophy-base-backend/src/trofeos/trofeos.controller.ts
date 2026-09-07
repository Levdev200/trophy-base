import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TrofeosService } from './trofeos.service';
import { CreateTrofeoDto } from './dto/create-trofeo.dto';
import { UpdateTrofeoDto } from './dto/update-trofeo.dto';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('trofeos')
export class TrofeosController {
  constructor(private readonly trofeosService: TrofeosService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createTrofeoDto: CreateTrofeoDto) {
    return this.trofeosService.create(createTrofeoDto);
  }

  @Get()
  findAll() {
    return this.trofeosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trofeosService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrofeoDto: UpdateTrofeoDto) {
    return this.trofeosService.update(+id, updateTrofeoDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trofeosService.remove(+id);
  }
}
