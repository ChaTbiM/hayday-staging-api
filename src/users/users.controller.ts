import { Body, Controller, Get } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findOne(@Body() LoginDto: LoginDto): Promise<User> {
    return this.usersService.findOne(LoginDto.email);
  }
}
