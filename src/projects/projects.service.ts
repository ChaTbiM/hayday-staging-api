import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatService } from 'src/chat/chat.service';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Status } from './entities/status.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private chatService: ChatService
  ) {
  }

  async findAll() {
    const projects = await this.projectRepository.createQueryBuilder("project")
      .innerJoinAndSelect("project.client", "user")
      .andWhere("project.status = :projectStatus", { projectStatus: Status.INPROGRESS })
      .leftJoinAndSelect("project.messages", "message")
      .getMany()
    return projects;
  }

  async getProjectMessages(projectId) {
    return await this.chatService.getProjectMessage(projectId);
  }



}
