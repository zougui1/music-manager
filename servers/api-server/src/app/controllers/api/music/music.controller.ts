import { Context, dependency, Get, Post, HttpResponse, HttpResponseOK, Log, ApiResponse, ValidateBody } from '@foal/core';
import { Music } from 'music-pkg';
import { Playlist } from 'playlist-pkg';
import { Downloader } from 'downloader-pkg';
import path from 'path';

import { addMusicBodySchema } from './music.dto';

@Log('MusicController', { body: true, params: true, query: true })
export class MusicController {

  @dependency
  music!: Music;
  @dependency
  playlist!: Playlist;

  @Get('/')
  @ApiResponse(200, {
    description: 'List of musics',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
          }
        }
      }
    }
  })
  async find(ctx: Context): Promise<HttpResponse> {
    const musics = await this.music.findMany();
    return new HttpResponseOK(musics);
  }

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

  @Post('/')
  //@ValidateBody(AddMusicBody)
  @ValidateBody(addMusicBodySchema)
  @ApiResponse(201, {
    description: 'Music created',
    content: {
      'application/json': {
        schema: {
          type: 'object',
        }
      }
    },
  })
  async add(ctx: Context): Promise<HttpResponse> {
    const { link, playlistId } = ctx.request.body;
    const downloader = new Downloader(link);
    const downloadeds = await downloader.downloadAudio();

    for (const downloaded of downloadeds) {
      const musicFileName = path.basename(downloaded.file);
      const thumbnailFileName = downloaded.cover
        ? path.basename(downloaded.cover)
        : undefined;

      const music = await this.music.create({
        title: downloaded.title,
        link: `http://localhost:3333/files/${musicFileName}`,
        duration: downloaded.duration,
        artists: downloaded.artists,
        album: downloaded.album,
        source: downloaded.source,
        thumbnail: thumbnailFileName
          ? `http://localhost:3333/files/${thumbnailFileName}`
          : undefined,
      });

      if (playlistId) {
        await this.playlist.addMusic(playlistId, music);
      }
    }

    return new HttpResponseOK();
  }
}
