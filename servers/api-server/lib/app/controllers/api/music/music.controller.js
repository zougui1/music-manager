"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicController = void 0;
const core_1 = require("@foal/core");
const music_pkg_1 = require("music-pkg");
const playlist_pkg_1 = require("playlist-pkg");
const downloader_pkg_1 = require("downloader-pkg");
const path_1 = __importDefault(require("path"));
const music_dto_1 = require("./music.dto");
class MusicController {
    async find(ctx) {
        const musics = await this.music.findMany({ user: { id: ctx.user.id } });
        return new core_1.HttpResponseOK(musics);
    }
    async findOptions(ctx) {
        return new core_1.HttpResponseOK();
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
    async add(ctx) {
        const { link, playlistId } = ctx.request.body;
        // TODO the downloading must be run in parallel
        const downloader = new downloader_pkg_1.Downloader(link);
        const downloadeds = await downloader.downloadAudio();
        //? since the downloading will run in parallel
        //? the musics cannot be created here
        //? should the API server subscribe the RabbitMQ
        //? to created them or should the process that
        //? will do the downloading, create the musics as well?
        for (const downloaded of downloadeds) {
            const musicFileName = path_1.default.basename(downloaded.file);
            const thumbnailFileName = downloaded.cover
                ? path_1.default.basename(downloaded.cover)
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
            });
            if (playlistId) {
                await this.playlist.addMusic(playlistId, music);
            }
        }
        return new core_1.HttpResponseOK();
    }
}
__decorate([
    core_1.dependency,
    __metadata("design:type", typeof (_a = typeof music_pkg_1.Music !== "undefined" && music_pkg_1.Music) === "function" ? _a : Object)
], MusicController.prototype, "music", void 0);
__decorate([
    core_1.dependency,
    __metadata("design:type", typeof (_b = typeof playlist_pkg_1.Playlist !== "undefined" && playlist_pkg_1.Playlist) === "function" ? _b : Object)
], MusicController.prototype, "playlist", void 0);
__decorate([
    core_1.Get('/'),
    core_1.ApiResponse(200, {
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
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "find", null);
__decorate([
    core_1.Options('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "findOptions", null);
__decorate([
    core_1.Post('/')
    //@ValidateBody(AddMusicBody)
    ,
    core_1.ValidateBody(music_dto_1.addMusicBodySchema),
    core_1.ApiResponse(201, {
        description: 'Music created',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                }
            }
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "add", null);
exports.MusicController = MusicController;
//# sourceMappingURL=music.controller.js.map