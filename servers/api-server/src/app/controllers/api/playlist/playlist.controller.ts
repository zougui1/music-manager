import { Context, dependency, Get, Post, Patch, Options, HttpResponse, HttpResponseOK, ApiResponse, HttpResponseNotFound } from '@foal/core';
import { Playlist, UpdateOptions } from 'playlist-pkg';

import { UserContext } from '../../../types';

export class PlaylistController {

  @dependency
  playlist!: Playlist;

  @Get('/')
  @ApiResponse(200, {
    description: 'List of playlists',
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
    const playlists = await this.playlist.findMany({ user: ctx.user });
    return new HttpResponseOK(playlists);
  }

  @Get('/:id')
  async findOne(ctx: Context, { id }: { id: number }): Promise<HttpResponse> {
    const playlist = await this.playlist.findById(+id);

    if (!playlist) {
      return new HttpResponseNotFound();
    }

    return new HttpResponseOK(playlist);
  }

  @Post('/')
  async add(ctx: Context<UserContext>): Promise<HttpResponse> {
    const playlist = ctx.request.body;
    await this.playlist.create({ user: ctx.user, ...playlist });
    return new HttpResponseOK(playlist);
  }

  @Options('/')
  async opt(): Promise<HttpResponse> { return new HttpResponseOK(); }

  @Patch('/:id')
  async update(ctx: Context, { id }: { id: number }, body: UpdateOptions): Promise<HttpResponse> {
    await this.playlist.update({ id, user: ctx.user }, body);
    return new HttpResponseOK();
  }

  @Options('/:id')
  async optById(): Promise<HttpResponse> { return new HttpResponseOK(); }
}
