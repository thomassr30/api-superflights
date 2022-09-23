import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { PassengerService } from '../passenger/passenger.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Flights')
@ApiBasicAuth()
@UseGuards(JwtAuthGuard)
@Controller('flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private passengerService: PassengerService
    ) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }

  @Get()
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.update(id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightService.remove(id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ){
    const passenger = await this.passengerService.findOne(passengerId);
    if(!passenger) throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND)

    return this.flightService.addPassenget(flightId, passengerId)
  }
}
