import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const configService: ConfigService = new ConfigService();
const ormConfig: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'DormDB',
  username: 'postgres',
  password: 'Fcthebest_200239',
  entities: ['dist/src/**/**/*.entity.js'],
  logging: true,
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*{.js,.ts}'],
});
export default ormConfig;