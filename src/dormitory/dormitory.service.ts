import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Dormitory } from "./entity/dormitory.entity";
import { CreateDormDto } from "./dto/create-dorm.dto";
import { DormitoryEnum } from "./entity/dormitory.enum";

@Injectable()
export class DormitoryService{
  constructor(@InjectRepository(Dormitory) private readonly dormRepository: Repository<Dormitory>){}

  async createDorm(dto: CreateDormDto) {
    const dorm = this.dormRepository.create();
    dorm.address = dto.address;
    dorm.description = dto.description;
    dorm.name = dto.name;
    return await this.dormRepository.save(dorm);
  }

  async findOneByName(name: DormitoryEnum){
    return await this.dormRepository.findOneBy({name})
  }
}