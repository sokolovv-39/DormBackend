import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { getMailerConfig } from 'configurations/mailer-module.config';

@Global()
@Module({
  imports: [MailerModule.forRootAsync(getMailerConfig()),],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
