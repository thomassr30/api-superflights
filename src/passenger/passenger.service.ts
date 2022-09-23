import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from 'src/common/models/models';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { Model } from 'mongoose';
import { IPassanger } from '../common/interfaces/passanger.interface';

@Injectable()
export class PassengerService {

  constructor(
    @InjectModel(PASSENGER.name)
    private model: Model<IPassanger>
  ){}

  async create(createPassengerDto: CreatePassengerDto) {
    const newPassenger = new this.model(createPassengerDto)
    return await newPassenger.save()
  }

  async findAll() {
    return await this.model.find()
  }

  async findOne(id: string) {
    return await this.model.findById(id)
  }

  async update(id: string, updatePassengerDto: UpdatePassengerDto) {
    const passenger = {...updatePassengerDto}
    return await this.model.findByIdAndUpdate(id, passenger, {new: true})
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id)
    return {status: HttpStatus.OK}
  }
}
