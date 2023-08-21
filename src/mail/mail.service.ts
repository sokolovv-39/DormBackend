import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfirmMailDto } from 'src/user/dto/confirm-mail.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {

  constructor(private readonly mailerService: MailerService) {}

  async sendCodeMail(name: string, email: string, code: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Код подтверждения',
      template: './code',
      context: {
        name,
        code,
      }
    });
  }

  async sendConfirmMail(data: ConfirmMailDto): Promise<void>{
    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Регистрация на заселение',
      template: './confirm-mail',
      context: {
        recordDatetime: data.recordDatetime,
        dormitory: data.dormitory,
        contacts: data.contacts
      }
    })
  }
}