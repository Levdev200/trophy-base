import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrofeosService } from './trofeos.service';
import { CreateTrofeoDto } from './dto/create-trofeo.dto';
import { UpdateTrofeoDto } from './dto/update-trofeo.dto';

@Controller('trofeos')
export class TrofeosController {
  constructor(private readonly trofeosService: TrofeosService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrofeoDto: UpdateTrofeoDto) {
    return this.trofeosService.update(+id, updateTrofeoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trofeosService.remove(+id);
  }
}
