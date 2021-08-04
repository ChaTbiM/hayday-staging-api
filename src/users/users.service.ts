import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { Status } from 'src/projects/entities/status.enum';
import { ProjectsService } from 'src/projects/projects.service';
import { Repository } from 'typeorm';
import { Role } from './entities/role.enum';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private projectService: ProjectsService
  ) {
  }

  async findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({ email })
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserProjects(userId, role) {
    if (role === Role.ADMIN) {
      try {
        return this.projectService.findAll();
      } catch (error) {
        return null
      }
    }
    else if (role === Role.EMPLOYEE) {
      try {
        const user = await this.usersRepository.createQueryBuilder("user")
          .innerJoinAndSelect("user.managedProjects", "project")
          .where("user.id = :userId", { userId })
          .andWhere("project.status = :projectStatus", { projectStatus: Status.INPROGRESS })
          .andWhere("user.role = 'employee'")
          .innerJoinAndSelect("project.client", "user.id")
          .getOne()
        return user.managedProjects;
      } catch (error) {
        return null
      }
    } else if (role === Role.CLIENT) {
      try {
        return await (await this.usersRepository.findOne({ id: userId, role }, { relations: ["projects"] })).projects
      } catch (error) {
        return null
      }
    }

    return null;

  }
}
