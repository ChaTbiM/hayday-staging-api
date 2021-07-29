import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {
  user: User;
  counter: number = 0;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(email, password): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = { email: user.email, sub: user.userId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
