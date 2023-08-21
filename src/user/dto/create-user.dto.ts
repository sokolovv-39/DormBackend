import { ApiProperty, PickType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { IsNotEmpty } from "class-validator";
import { DormitoryEnum } from "src/dormitory/entity/dormitory.enum";
import { Type } from "class-transformer";

export class CreateUserDto extends PickType(User, ['personalNumber', 'fullname', 'gender', 'citizenship', 'faculty', 'phone', 'educationLevel'] as const) {
    @IsNotEmpty()
    @ApiProperty({enum: DormitoryEnum, description: 'общежитие студента'})
    dormitory_name: DormitoryEnum;

    @ApiProperty({type: Date, example: '2023-08-25T10:00:00', description: 'Время заселения'})
    @Type(() => Date)
    recordDatetime: string;
}
