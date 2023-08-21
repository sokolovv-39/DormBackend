import { ApiProperty } from "@nestjs/swagger";

export class SignInAdminDto{
    @ApiProperty({example: 'IvanovII', description: 'логин для входа в админ панель'})
    login:string;

    @ApiProperty({description: 'Ваш пароль для входа в админ панель'})
    password: string;
}