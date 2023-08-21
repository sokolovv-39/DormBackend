import { Module } from '@nestjs/common';
import { DormitoryService } from './dormitory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dormitory } from './entity/dormitory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dormitory])],
  providers: [DormitoryService],
  exports: [DormitoryService]
})
export class DormitoryModule {}
