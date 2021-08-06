import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProjectsService } from './projects.service';

@UseGuards(JwtAuthGuard)
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
