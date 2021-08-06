import { ConnectionOptions } from 'typeorm';
require('dotenv').config()

const AUTO_MIGRATE = process.env.AUTO_MIGRATE === "false" ? false : true;
const DATABASE_URL = process.env.DATABASE_URL;

const config: ConnectionOptions[] = [{
    name: "default",
    type: 'postgres',
    url: DATABASE_URL,
    entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
    // We are using migrations, synchronize should be set to false.
    synchronize: true,
    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: AUTO_MIGRATE,
    logging: true,
    logger: 'file',

    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
},
{
    name: "seed",
    type: 'postgres',
    url: DATABASE_URL,
    entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
    // We are using migrations, synchronize should be set to false.
    synchronize: false,
    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: false,
    logging: true,
    logger: 'file',

    migrations: [__dirname + '/seeders/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/seeders',
    },
}
];

export = config;