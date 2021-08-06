import { Controller, Get, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  getProjects() {
    return this.projectsService.findAll();
  }

  @Get('/:id/messages')
  getProjectMessages(@Param() params) {
    const projectId = params.id;
    return this.projectsService.getProjectMessages(projectId);
  }
}
