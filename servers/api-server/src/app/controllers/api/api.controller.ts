import { controller, IAppController, ApiInfo, ApiServer } from '@foal/core';

import { MusicController } from './music';
import { PlaylistController } from './playlist';
import { UserController } from './user';
import { AuthController } from './auth';

@ApiInfo({
  title: 'Music API',
  version: '1.0.0',
})
@ApiServer({
  url: '/api',
})
export class ApiController {
  subControllers: IAppController['subControllers'] = [
    controller('/musics', MusicController),
    controller('/playlists', PlaylistController),
    controller('/users', UserController),
    controller('/', AuthController),
  ];
}
