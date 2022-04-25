import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { Products } from './src/products/models/Products';

const PROD_ENV = 'production';

const config = {
  host: process.env.TYPEORM_HOST,
  user: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
};

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.host,
  port: 5432,
  username: config.user || 'postgres',
  password: config.password || 'postgres',
  database: config.database || 'postgres',
  entities: [Products],
  // We are using migrations, synchronize should be set to false.
  synchronize: true,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = connectionOptions;
