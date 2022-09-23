import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}

  async validateUser(username: string, password: string){

    const user = await this.userService.findByUsername(username);

    const isValidPassword = await this.userService.checkPassword(password, user.password)

    if(user && isValidPassword) return user

    return null
  }

  async signIn(user: any){
    const payload = {
      username: user.username,
      sub: user._id
    }

    return {
      name: user.name,
      username: user.username,
      token: this.jwtService.sign(payload)
    }
  }

  async signUp(createUserDto: CreateUserDto){
    return this.userService.create(createUserDto)
  }
}
