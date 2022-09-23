import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FLIGHT } from '../common/models/models';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';

@Injectable()
export class FlightService {

  constructor(
    @InjectModel(FLIGHT.name)
    private model: Model<IFlight>
  ){}

  async create(createFlightDto: CreateFlightDto) {
    const newFlight = new this.model(createFlightDto)
    return await newFlight.save()
  }

  async findAll() {
    return await this.model.find()
  }

  async findOne(id: string) {
    return await this.model.findById(id).populate('passengers')
  }

  async update(id: string, updateFlightDto: UpdateFlightDto) {
    return await this.model.findByIdAndUpdate(id, updateFlightDto, {new: true})
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id)
    return {status: HttpStatus.OK}
  }

  async addPassenget(flightId: string, passengerId: string) {
    return await this.model.findByIdAndUpdate(flightId, 
      {$addToSet: {passengers: passengerId}},
      {new: true}
    ).populate('passengers')
  }
}
