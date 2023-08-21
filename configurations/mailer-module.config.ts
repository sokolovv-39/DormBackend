import { MailerOptions } from "@nestjs-modules/mailer";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { ConfigService } from "@nestjs/config";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
const MailerConfig = async (
    configService: ConfigService
) : Promise<MailerOptions> =>({
    transport: {
        host: configService.get('mail_host'),
        port: configService.get('mail_port'),
        secure: true,
        auth: {
            user: configService.get('mail_user'),
            pass: configService.get('mail_pass'),
        }
      },
    defaults: {
        from: configService.get('mail_from')
    },
    template: {
        dir: 'src/mail/templates',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
    }
})

export const getMailerConfig = (): MailerAsyncOptions => ({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => MailerConfig(config)
})