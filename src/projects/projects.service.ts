import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatService } from 'src/chat/chat.service';
import { createQueryBuilder, Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { Project } from './entities/project.entity';
import { Status } from './entities/status.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(File)
    private fileRepository: Repository<File>,
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

  async getProjectFiles(projectId) {
    const files = await (await this.projectRepository.findOneOrFail({ relations: ["files"], where: { id: projectId } })).files
    return files;
  }

  async saveFiles(projectId, files) {
    const project = await this.projectRepository.findOneOrFail({ id: projectId })
    const savedFiles = await files.map(async (file) => {
      let savedFile = new File();
      savedFile = { ...file, project }
      await this.fileRepository.save(savedFile);
      return savedFile
    })

    await this.projectRepository.save(project);
    return await Promise.all(savedFiles);
  }




}
