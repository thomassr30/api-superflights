import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Passengers')
@ApiBasicAuth()
@UseGuards(JwtAuthGuard)
@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() createPassengerDto: CreatePassengerDto) {
    return this.passengerService.create(createPassengerDto);
  }

  @Get()
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passengerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassengerDto: UpdatePassengerDto) {
    return this.passengerService.update(id, updatePassengerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passengerService.remove(id);
  }
}
