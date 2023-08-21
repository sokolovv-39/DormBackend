import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { VerificationService } from './verification.service';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'configurations/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [UserModule, AdminModule,
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule.register({defaultStrategy: 'jwt'})],
  controllers: [AuthController],
  providers: [AuthService, VerificationService]
})
export class AuthModule {}
