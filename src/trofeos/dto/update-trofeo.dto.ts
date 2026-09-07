import { PartialType } from '@nestjs/mapped-types';
import { CreateTrofeoDto } from './create-trofeo.dto';

export class UpdateTrofeoDto extends PartialType(CreateTrofeoDto) {}
