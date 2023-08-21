import { PickType } from "@nestjs/swagger";
import { DormitoryEnum } from "src/dormitory/entity/dormitory.enum";
import { EducationLevelEnum } from "src/user/entities/education.enum";
import { Gender } from "src/user/entities/gender.enum";
import { User } from "src/user/entities/user.entity";

export class UserForAdminDto {
    fullname: string;
    gender: Gender;
    citizenship: string;
    faculty: string;
    phone: string;
    educationLevel: EducationLevelEnum;
    email: string;
    recordDatetime: string
    dorm_name: DormitoryEnum

    constructor(user: User) {
        this.fullname = user.fullname
        this.gender = user.gender
        this.citizenship = user.citizenship
        this.faculty = user.faculty
        this.phone = user.phone
        this.educationLevel = user.educationLevel
        this.email = User.GetEmailFromNumber(user.personalNumber)
        this.recordDatetime = user.recordDatetime.toLocaleString()
        this.dorm_name = user.dormitory.name
    }
}