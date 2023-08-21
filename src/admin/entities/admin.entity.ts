import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdminType } from "./admin-type.enum";
import { Dormitory } from "src/dormitory/entity/dormitory.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn({name: 'admin_id'})
    adminId: number;

    @ApiProperty({example: 'IvanovII', description: 'Логин для входа в админ панель'})
    @Column({unique: true})
    login: string;

    @ApiProperty({description: 'Ваш сложный пароль для входа'})
    @Column()
    password: string;

    @ApiProperty({example: 'Иванов Иван Иванович', description: 'ФИО'})
    @Column()
    fullname: string;


    @ApiProperty({description: 'Показывать данные админа или нет для заселяющихся'})
    @Column({
        name: 'is_show',
        default: false
    })
    isShow: boolean;

    @ApiProperty({example: 'Администратор общежития Г-1', description: 'Должность в общежитии'})
    @Column()
    position: string;

    @ApiProperty({example: '+79876543210', description: 'Контакты администратора'})
    @Column({nullable: true})
    phone: string;

    @Column({
        type: 'enum',
        enum: AdminType,
        name: 'admin_type'
    })
    adminType: AdminType

    @ManyToOne(() => Dormitory, (dorm: Dormitory) => dorm.admins)
    dormitory: Dormitory
}
