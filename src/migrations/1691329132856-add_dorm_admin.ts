import { hash } from "argon2";
import { MigrationInterface, QueryRunner } from "typeorm"

export class AddDormAdmin1691329132856 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO public.admins(
            login, password, fullname, admin_type, is_show, "position", "dormitoryDormitoryId", phone)
            VALUES 
                ('PopovAA', '${await hash('07092003')}', 'Попов Александр Андреевич', 'Главный админ', false, 'Разработчик', 6, '+7(903)-373-41-72'),
                ('ZebelyanAV', '${await hash('12052004')}', 'Зебелян Артём Валерьевич', 'Главный админ', false, 'Техническая поддержка', 3, '+7(918)-003-83-84'),
                ('SokolovIA', '${await hash('29072002')}', 'Соколов Игорь Андреевич', 'Главный админ', false, 'Разработчик', 3, '+7(987)-359-56-39'),
                ('AivazovaIR', '${await hash('BestAdminIR')}', 'Айвазова Инга Рубеновна', 'Главный админ', true, 'Админинстратор М-3', 3, '+7(495)-333-72-36'),
                ('MedvedevaIP', '${await hash('BestAdminIP')}', 'Медведева Ирина Павловна', 'Главный админ', true, 'Администратор М-3', 3, '+7(495)-333-72-36'),
                ('KudryaDG', '${await hash('DirectorM3')}', 'Кудря Давид Григорьевич', 'Главный админ', false, 'Директор М-3', 3, '+7(495)-333-33-08'),
                ('FilippovDV', '${await hash('MetallurgDirector')}', 'Филиппов Дмитрий Вадимович', 'Главный админ', false, 'Директор Металлурга', 1, '+7(495)-333-40-48'),
                ('Zhigareva', '${await hash('PredsedSSo')}', 'Жигарева Александра Максимовна', 'Главный админ', false, 'Председатель ССО', 3, '+7(953)-429-60-78');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DELETE FROM public.admins
            WHERE login = 'PopovAA' 
                or login = 'ZebelyanAV' 
                or login = 'SokolovIA 
                or login = 'AivazovaIR' 
                or login = 'MedvedevaIP' 
                or login = 'KudryaDG' 
                or login = 'FilippovDV'
                or login = 'Zhigareva'';
        `)
    }

}
