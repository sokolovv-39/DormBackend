import { Controller, Get, Post, Body, Patch, UseGuards, Delete, SetMetadata, Query, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateDormDto } from '../dormitory/dto/create-dorm.dto';
import { Dormitory } from '../dormitory/entity/dormitory.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DormitoryService } from 'src/dormitory/dormitory.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AuthAdminGuard } from './admin.guard';
import { AdminType } from './entities/admin-type.enum';
import { AdminRoleGuard } from './admin-role.guard';


@ApiTags('Действия администратора')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly dormService: DormitoryService,
    private readonly userService: UserService) {}


  @Get('get-users')
  @UseGuards(AuthAdminGuard)
  async getUsers(@Query('login') login: string){
    return await this.adminService.findAllUsers(login)
  }

  @Post('create-user')
  @UseGuards(AuthAdminGuard, AdminRoleGuard)
  @SetMetadata('roles', [AdminType.Main, AdminType.Dorm])
  @ApiBody({type: CreateUserDto})
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put('update-user')
  @UseGuards(AuthAdminGuard, AdminRoleGuard)
  @SetMetadata('roles', [AdminType.Main, AdminType.Dorm])
  @ApiBody({type: UpdateUserDto})
  updateUser(@Body() dto: UpdateUserDto){
    return this.userService.update(dto)
  }

  @Delete('delete-record')
  @UseGuards(AuthAdminGuard, AdminRoleGuard)
  @SetMetadata('roles', [AdminType.Main, AdminType.Dorm])
  @ApiOperation({description: 'Создание общежития'})
  @ApiBody({schema: {properties: {email: {type: 'string', example: 'm2110501@edu.misis.ru'}}}})
  async deleteUser(@Body('email') email: string){
    return await this.userService.removeRecord(email);
  }

  // @Post('create-dorm')
  // @ApiBody({type: CreateDormDto})
  // createDorm(@Body() dto: CreateDormDto): Promise<Dormitory>{
  //   return this.dormService.createDorm(dto)
  // }

  @Get('parseFromExcel')
  @UseGuards(AuthAdminGuard, AdminRoleGuard)
  @SetMetadata('roles', [AdminType.Main])
  parseFromExcel(){
    return this.adminService.parseFromExcel();
  }

  @Post('create-admin')
  @UseGuards(AuthAdminGuard, AdminRoleGuard)
  @SetMetadata('roles', [AdminType.Main])
  @ApiBody({type: CreateAdminDto})
  async createAdmin(@Body() dto: CreateAdminDto){
    return await this.adminService.createAdmin(dto)
  }
}
