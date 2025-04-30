import { Module } from '@nestjs/common';
import { ProjectsController } from 'src/modules/projects/controller/projects.controller';
import { ProjectsService } from 'src/modules/projects/services/projects.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
