import { Context, HttpResponse } from '@foal/core';
import { Music } from 'music-pkg';
import { Playlist } from 'playlist-pkg';
export declare class MusicController {
    music: Music;
    playlist: Playlist;
    find(ctx: Context): Promise<HttpResponse>;
    /**
     * TODO rewrite it with TypeORM
    async getOne({ params, response }: HttpContextContract): Promise<void | Music> {
      //const music = await Music.find(params.id);
      const music = await Music.query().whereRaw('artists LIKE \'%"SKÁLD"%\'').first();
  
      if (!music) {
        return response.notFound();
      }
  
      return music;
    }
    */
    add(ctx: Context): Promise<HttpResponse>;
}
//# sourceMappingURL=music.controller.d.ts.map