import { ApiProperty, PickType } from "@nestjs/swagger";
import { Admin } from "../entities/admin.entity";
import { IsNotEmpty } from "class-validator";
import { AdminType } from "../entities/admin-type.enum";
import { DormitoryEnum } from "src/dormitory/entity/dormitory.enum";

export class CreateAdminDto extends PickType(Admin, ['login', 'password', 'fullname', 'isShow', 'position', 'phone'] as const){
    @ApiProperty({enumName: 'AdminRole',enum: AdminType, description: 'Тип администратора'})
    adminType: AdminType

    @ApiProperty({enumName: 'DormName',enum: DormitoryEnum, description: 'общежитие студента'})
    dormitory_name: DormitoryEnum;
}
