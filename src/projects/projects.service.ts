import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/chat/entities/message.entity';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Status } from './entities/status.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
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

    const messages = (await this.projectRepository.findOneOrFail({ id: projectId }, { relations: ["messages", "messages.from"] })).messages
    return messages;
  }



}
