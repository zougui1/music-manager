const { Config } = require('@foal/core');
const { MusicEntity, MusicPlayingEntity, PlaylistEntity, PlaylistToMusicEntity, UserEntity } = require('database-pkg');

module.exports = {
  type: Config.getOrThrow('database.type', 'string'),

  url: Config.get('database.url', 'string'),
  host: Config.get('database.host', 'string'),
  port: Config.get('database.port', 'number'),
  username: Config.get('database.username', 'string'),
  password: Config.get('database.password', 'string'),
  database: Config.get('database.database', 'string'),

  logging: Config.get('database.logging', 'boolean'),
  dropSchema: Config.get('database.dropSchema', 'boolean', false),
  synchronize: Config.get('database.synchronize', 'boolean', false),

  entities: [MusicEntity, MusicPlayingEntity, PlaylistEntity, PlaylistToMusicEntity, UserEntity],
  migrations: ['build/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations'
  },
}
