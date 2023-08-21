import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { hash, verify } from 'argon2';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class VerificationService {
  constructor(private readonly userService: UserService) {}

  async generateCode(): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  }

  async storeCode(email: string, code: string): Promise<void> {
    const user = await this.userService.findOneByEmail(email)
    user.codeConfirm = await hash(code);
    this.userService.save(user) 
  }

  async checkCode(email: string, code: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user || !user.codeConfirm) {
      return null;
    }
    if(verify(user.codeConfirm, code)){
      return user;
    }
  }

  async deleteCode(email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 150000));
    const user = await this.userService.findOneByEmail(email);
    user.codeConfirm = null;
    await this.userService.save(user);
  }
}
