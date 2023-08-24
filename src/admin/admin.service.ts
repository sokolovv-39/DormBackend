import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { WorkBook, readFile, utils } from 'xlsx';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { Gender } from 'src/user/entities/gender.enum';
import { json } from 'stream/consumers';
import { Dormitory } from 'src/dormitory/entity/dormitory.entity';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserService } from 'src/user/user.service';
import { Admin } from './entities/admin.entity';
import { hash } from 'argon2';
import { AdminType } from './entities/admin-type.enum';
import { DormitoryService } from 'src/dormitory/dormitory.service';
import { DormitoryEnum } from 'src/dormitory/entity/dormitory.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
    private readonly dormService: DormitoryService,
    private readonly userService: UserService){}

  async createAdmin(dto: CreateAdminDto) {
    const oldAdmin = await this.adminRepository.findOneBy({
      login: dto.login
    })
    if(oldAdmin != null){
      throw new BadRequestException("Такой пользователь уже существует")
    }
    const newAdmin = this.adminRepository.create()
    newAdmin.login = dto.login
    newAdmin.password = await hash(dto.password)
    newAdmin.fullname = dto.fullname
    newAdmin.isShow = dto.isShow
    newAdmin.position= dto.position
    newAdmin.adminType = dto.adminType
    newAdmin.phone = dto.phone
    newAdmin.dormitory = await this.dormService.findOneByName(dto.dormitory_name);
    const savedAdmin = await this.adminRepository.save(newAdmin)
    const {password, adminId, dormitory, ...result} = savedAdmin
    result['dorm_name'] = savedAdmin.dormitory.name
    return result 
  }

  findAll() {
    return `This action returns all admin`;
  }

  async findOneByLogin(login: string): Promise<Admin | null> {
     return await this.adminRepository.findOne({
      where: {
        login
      },
      relations: {
        dormitory: true
      }
     })
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async parseFromExcel(){
    const workbook: WorkBook = readFile("src/files/LIST.xlsx");
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

    const headers = Object.values(jsonData[0]);
    const data = jsonData.slice(1);

    const result = data.map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });

    for(const obj of result){
      if(obj['Номер ЛД'] != undefined && obj['Рекомендуемое общежитие (выпадающий список)'] != undefined){
        const user = await this.userService.getUserFromObject(obj)
        await this.userService.save(user)
      }
    }
  }

  async getAdminsForShow(dorm_name: DormitoryEnum){
    const admins =  await this.adminRepository.find({
      where: {
        dormitory: {
          name: dorm_name
        },
        isShow: true
      }
    })
    return admins.map(contact => ({
      fullname: contact.fullname,
      position: contact.position,
      phone: contact.phone
    }));
  }

  async findAllUsers(login: string){
    const admin = await this.findOneByLogin(login)
    let users = []
    let result = {}
    console.log(result)
    if(admin.adminType === AdminType.Main){
      result[DormitoryEnum.M1] = [];
      result[DormitoryEnum.M2] = [];
      result[DormitoryEnum.M3] = [];
      result[DormitoryEnum.M4] = [];
      result[DormitoryEnum.G1] = [];
      result[DormitoryEnum.G2] = [];
      result[DormitoryEnum.DSG] = [];
      result[DormitoryEnum.DK] = [];

      users = await this.userService.findAllForAdmin()
    }
    else{
      result[admin.dormitory.name] = []
      users = await this.userService.findAllForAdmin(admin.dormitory.name)
    }

    users.forEach((user) => {
      if (user.dormitory && user.dormitory.name in result) {
        const userRes = {
          email: User.GetEmailFromNumber(user.personalNumber),
          fullname: user.fullname,
          gender: user.gender,
          citizenship: user.citizenship,
          educationLevel: user.educationLevel,
          recordDatetime: user.recordDatetime.toLocaleString()
        }
        result[user.dormitory.name].push(userRes);
      }
    });

    return result
  }
}
