import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from 'src/chat/chat.service';
import { Message } from 'src/chat/entities/message.entity';
import { File } from './entities/file.entity';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([File,Project, Message]), MulterModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, TypeOrmModule, ChatService],
  exports: [ProjectsService,TypeOrmModule]
})
export class ProjectsModule { }
