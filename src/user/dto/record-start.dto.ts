import { PickType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { Dormitory } from "src/dormitory/entity/dormitory.entity";
import { DormitoryEnum } from "src/dormitory/entity/dormitory.enum";

export class RecordStartDto{
    fullname: string
    email: string
    takenTime: string[]
    dormitory: {name: DormitoryEnum, address: string, description: string}
    contacts: {fullname: string, position: string, phone: string}[]
}