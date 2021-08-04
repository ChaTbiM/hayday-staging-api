import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('project')
  async getUserProjects(@Req() req) {
    const userId = req.user.userId;
    const role = req.user.role;
    return this.usersService.getUserProjects(userId, role);
  }
}
