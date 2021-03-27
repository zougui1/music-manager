import { controller, IAppController, ApiInfo, ApiServer, Log } from '@foal/core';
import { JWTRequired } from '@foal/jwt';

import { MusicController } from './music';
import { PlaylistController } from './playlist';
import { UserController } from './user';
import { RefreshJWT } from '../../hooks';

@ApiInfo({
  title: 'Music API',
  version: '1.0.0',
})
@ApiServer({
  url: '/api',
})
@Log('API', { body: true, params: true, query: true })
@JWTRequired()
@RefreshJWT()
export class ApiController {
  subControllers: IAppController['subControllers'] = [
    controller('/musics', MusicController),
    controller('/playlists', PlaylistController),
    controller('/users', UserController),
  ];
}
