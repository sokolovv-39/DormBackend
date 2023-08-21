import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import config from '../configurations/env.config';
import { MailModule } from './mail/mail.module';
import { getTypeormConfig } from 'configurations/typeorm-module.config';
import { DormitoryModule } from './dormitory/dormitory.module';
import { AppController } from './app.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forRootAsync(getTypeormConfig()),
  ConfigModule.forRoot({isGlobal: true, load: [config]}),
  AuthModule,
  UserModule,
  AdminModule,
  MailModule,
  DormitoryModule,],
  controllers: [AppController],
  providers: [JwtService],
})
export class AppModule {}