import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class SignInUserDto{
    @IsEmail()
    @ApiProperty({example: 'm2110501@edu.misis.ru', description: 'корпоративная почта МИСИС'})
    email:string;

    @ApiProperty({example: '123456', description: 'код подтверждения с почты'})
    code: string;
}