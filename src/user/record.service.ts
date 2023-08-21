import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { AdminService } from "src/admin/admin.service";
import { RecordStartDto } from "./dto/record-start.dto";
import { DormitoryEnum } from "src/dormitory/entity/dormitory.enum";
import { ConfirmMailDto } from "./dto/confirm-mail.dto";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class RecordService{
    constructor(
        private readonly userService: UserService,
        private readonly adminService: AdminService,
        private readonly mailService: MailService){}

    async startRecord(email: string): Promise<RecordStartDto | any> {
        let result = new RecordStartDto()
        const user = await this.userService.findOneByEmail(email)
        
        result.fullname = user.fullname
        result.email = User.GetEmailFromNumber(user.personalNumber)
        const {dormitoryId, ...dorm} = user.dormitory
        result.dormitory = dorm
        result.contacts = await this.adminService.getAdminsForShow(dorm.name)
        if(user.recordDatetime != null){
            delete result.takenTime
            result['faculty'] = user.faculty
            result['recordDatetime'] = user.recordDatetime.toLocaleString()
            result['message'] = 'Пользователь уже записан'
        }
        else{
            result.takenTime = await this.userService.getTakenTime(dorm.name)
        }
        return result
    }
    
    async confirmMail(email: string):Promise<void>{
        const user = await this.userService.findOneByEmail(email)
        const contacts = await this.adminService.getAdminsForShow(user.dormitory.name)
        const result = new ConfirmMailDto()
        result.email = email
        const months = [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря"
          ];
          
        const date = new Date(user.recordDatetime);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const hours = date.getHours();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
          
        result.recordDatetime = `${day} ${month}, ${hours}:${minutes}`;
        result.dormitory = user.dormitory
        result.contacts = contacts
        await this.mailService.sendConfirmMail(result)

    }
}