import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      .getMany()
    return projects;
  }




}
