import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CreatePadDto } from './dto/create-pad.dto';
import { PadsService } from './pads.service';

@Controller('api')
export class PadsController {
  constructor(private readonly padsService: PadsService) {}

  @Get('/:pad')
  findOrCreate(@Param('pad') pad: string) {
    console.log(`Returning/creating ${pad}`);
    return this.padsService.findOrCreate(pad);
  }

  @Put('/:pad')
  create(@Param('pad') pad: string, @Body() createPadDto: CreatePadDto) {
    console.log(`Updating/creating ${pad}`);
    return this.padsService.create(pad, createPadDto);
  }
}
