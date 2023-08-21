import { Controller, UseGuards, Post, Body, Put } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { RecordService } from "./user/record.service";
import { AuthUserGuard } from "./user/auth-user.guard";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { RecordStartDto } from "./user/dto/record-start.dto";
import { UpdateUserDto } from "./user/dto/update-user.dto";
import { TakeTimeDto } from "./user/dto/take-time.dto";
import { MailService } from "./mail/mail.service";

@ApiTags('Запросы пользователя')
@Controller()
export class AppController{
    constructor(
        private readonly userService: UserService, 
        private readonly recordService: RecordService,
        private readonly mailService: MailService){}

    @UseGuards(AuthUserGuard)
    @ApiBody({schema: {properties: {email: {type: 'string', example: 'm2110501@edu.misis.ru'}}}})
    @Post('start-recording')
    async startRecord(@Body('email')email: string): Promise<RecordStartDto>{
        return await this.recordService.startRecord(email)
    }

    @UseGuards(AuthUserGuard)
    @Post('take-time')
    async takeTime(@Body() dto: TakeTimeDto){
        return await this.userService.takeTime(dto) 
    }

    @UseGuards(AuthUserGuard)
    @ApiBody({schema: {properties: {email: {type: 'string', example: 'm2110501@edu.misis.ru'}}}})
    @Post('confirm-mail')
    async confirmRecord(@Body('email') email: string){
        await this.recordService.confirmMail(email)
    }

    @UseGuards(AuthUserGuard)
    @Put('free-time')
    @ApiBody({schema: {properties: {email: {type: 'string', example: 'm2110501@edu.misis.ru'}}}})
    async freeTime(@Body('email') email: string){
        await this.userService.removeRecord(email)
        return this.recordService.startRecord(email)
    }
}

    