import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { FlightSchema } from './schema/flight.schema';
import { FLIGHT } from '../common/models/models';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerModule } from '../passenger/passenger.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: FLIGHT.name,
      useFactory: () => FlightSchema.plugin(require('mongoose-autopopulate'))
    }]),
    PassengerModule
  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
