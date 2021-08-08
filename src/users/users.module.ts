import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from 'src/chat/chat.service';
import { Message } from 'src/chat/entities/message.entity';
import { Project } from 'src/projects/entities/project.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { ProjectsService } from 'src/projects/projects.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Project,Message]),ProjectsModule],
  controllers: [UsersController],
  providers: [UsersService, TypeOrmModule , ProjectsService,ChatService]
})
export class UsersModule { }
