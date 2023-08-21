import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Dormitory } from 'src/dormitory/entity/dormitory.entity';
import { RecordService } from './record.service';
import { JwtService } from '@nestjs/jwt';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Dormitory]), forwardRef(() => AdminModule)],
  providers: [UserService, RecordService, JwtService],
  exports: [UserService, RecordService]
})
export class UserModule {}
