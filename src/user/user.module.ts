import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from '../common/models/models';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: USER.name,
      useFactory: () => {
        return UserSchema
      }
    }])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
