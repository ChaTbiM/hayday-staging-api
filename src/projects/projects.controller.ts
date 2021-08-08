import { Controller, Get, Param, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { v4 as uuidv4 } from 'uuid';
import { ProjectsService } from './projects.service';


export const imageFileFilter = (req, file, callback) => {
  const imageTypes = [".png", ".jpeg", ".jpg", ".gif"];
  const fileType = path.extname((file.originalname).toLowerCase());
  if (!imageTypes.includes(fileType)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const storage = {
  storage: diskStorage({
    destination: './public',
    filename: (req, file, cb) => {
      const filename: string = uuidv4();
      const extension: string = path.extname(file.originalname);

      cb(null, `${filename}${extension}`)
    },

  },
  ),
  fileFilter: imageFileFilter
}

@Controller('project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProjects() {
    return this.projectsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/messages')
  getProjectMessages(@Param() params) {
    const projectId = params.id;
    return this.projectsService.getProjectMessages(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/file')
  @UseInterceptors(FilesInterceptor('files', 20, storage))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Param() params) {
    const projectId = params.id;
    return this.projectsService.saveFiles(projectId, files)
  }

  @Get(':path')
  seeUploadedFile(@Param('path') image, @Res() res) {
    return res.sendFile(path.join(process.cwd(), 'public' + image));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/files')
  getProjectFiles(@Param() params) {
    const projectId = params.id;
    return this.projectsService.getProjectFiles(projectId)
  }
}
