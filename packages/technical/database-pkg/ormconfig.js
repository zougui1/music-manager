const env = require('env-pkg');

const { MusicEntity, PlaylistEntity, PlaylistToMusicEntity, UserEntity } = require('./lib');

module.exports = {
  type: env.get('DB_CONNECTION').required().asString(),

  host: env.get('MYSQL_HOST').asString(),
  port: env.get('MYSQL_PORT').asPortNumber(),
  username: env.get('MYSQL_USER').required().asString(),
  password: env.get('MYSQL_PASSWORD').required().asString(),
  database: env.get('MYSQL_DATABASE').required().asString(),

  logging: env.get('MYSQL_LOGGING').default('false').asBool(),
  dropSchema: env.get('MYSQL_DROP_SCHEMA').default('false').asBool(),
  synchronize: env.get('MYSQL_SYNCHRONIZE').default('false').asBool(),

  entities: [MusicEntity, PlaylistEntity, PlaylistToMusicEntity, UserEntity],
  migrations: ['build/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations'
  },
};
