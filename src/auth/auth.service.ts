import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { VerificationService } from './verification.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { SignInAdminDto } from './dto/sign-admin.dto';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly mailService: MailService,
        private readonly verificationService: VerificationService,
        private readonly adminService: AdminService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async sendVerificationCode(email: string): Promise<void>{
        const personalNumber = User.GetNumberFromEmail(email)
        if(personalNumber == null){
            throw new BadRequestException('Это не корпоративная почта MISIS')
        }
        const user = await this.userService.findOneByEmail(email);
        if(user == null){
            throw new BadRequestException('Вас нет в списках на заселение')
        }
        
        const code = await this.verificationService.generateCode();
        await this.verificationService.storeCode(email, code)
        await this.mailService.sendCodeMail(user.fullname, email, code);
    }

    async signInUser(dto): Promise<any> {
        const user = await this.userService.findOneByEmail(dto.email);
        if(user?.codeConfirm === null || user === null){
            throw new UnauthorizedException();
        }
        if (! await verify(user?.codeConfirm, dto.code)) {
          throw new UnauthorizedException();
        }
        this.verificationService.deleteCode(dto.email)
        const payload = { sub: user.userId, email: User.GetEmailFromNumber(user.personalNumber), type: 'user'};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
      }
    
    async signInAdmin(dto: SignInAdminDto){
        const admin = await this.adminService.findOneByLogin(dto.login);
        if (! await verify(admin.password, dto.password)) {
          throw new UnauthorizedException();
        }
        const payload = { sub: admin.login, roles: admin.adminType, type: 'admin'};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
