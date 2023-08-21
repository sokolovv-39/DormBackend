import { Module, forwardRef } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Dormitory } from 'src/dormitory/entity/dormitory.entity';
import { DormitoryService } from 'src/dormitory/dormitory.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AdminRoleGuard } from './admin-role.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { Admin } from './entities/admin.entity';
import { UserModule } from 'src/user/user.module';
import { DormitoryModule } from 'src/dormitory/dormitory.module';

@Module({
  imports: [forwardRef(()=> UserModule), DormitoryModule, TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, JwtService, AdminRoleGuard,Reflector],
  exports: [AdminService]
})
export class AdminModule {}
