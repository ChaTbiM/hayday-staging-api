import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from 'src/chat/chat.service';
import { Message } from 'src/chat/entities/message.entity';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Message])],
  controllers: [ProjectsController],
  providers: [ProjectsService, TypeOrmModule, ChatService],
  exports: [ProjectsService]
})
export class ProjectsModule { }
