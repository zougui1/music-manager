import { Context, dependency, Get, Post, Options, HttpResponse, HttpResponseOK, ApiResponse, ValidateBody } from '@foal/core';
import { Music } from 'music-pkg';
import { Playlist } from 'playlist-pkg';
import { Downloader } from 'downloader-pkg';
import path from 'path';

import { addMusicBodySchema } from './music.dto';
import { UserContext } from '../../../types';

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
  async find(ctx: Context<UserContext>): Promise<HttpResponse> {
    const musics = await this.music.findMany({ user: { id: ctx.user.id } });
    return new HttpResponseOK(musics);
  }

  @Options('/')
  async findOptions(ctx: Context): Promise<HttpResponse> {
    return new HttpResponseOK();
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
  async add(ctx: Context<UserContext>): Promise<HttpResponse> {
    const { link, playlistId } = ctx.request.body;

    // TODO the downloading must be run in parallel
    const downloader = new Downloader(link);
    const downloadeds = await downloader.downloadAudio({ userId: ctx.user.id, playlistId });

    //? since the downloading will run in parallel
    //? the musics cannot be created here
    //? should the API server subscribe the RabbitMQ
    //? to created them or should the process that
    //? will do the downloading, create the musics as well?
    /*for (const downloaded of downloadeds) {
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
        user: ctx.user,
        tags: [],
        approved: downloaded.approved,
      });

      if (playlistId) {
        await this.playlist.addMusic(playlistId, music);
      }
    }*/

    return new HttpResponseOK();
  }
}
