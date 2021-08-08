import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import * as ormconfig from './ormconfig';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';


const ENV = process.env.NODE_ENV || "development";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    TypeOrmModule.forRoot(ormconfig[0]),
    TypeOrmModule.forRoot(ormconfig[1]),
    UsersModule,
    AuthModule,
    ProjectsModule,
    ChatModule,
  ],
  controllers: [AppController, AuthController, ProjectsController],
  providers: [AppService],
})
export class AppModule {

}