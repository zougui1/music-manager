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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistController = void 0;
const core_1 = require("@foal/core");
const playlist_pkg_1 = require("playlist-pkg");
class PlaylistController {
    async find(ctx) {
        const playlists = await this.playlist.findMany({ user: ctx.user });
        return new core_1.HttpResponseOK(playlists);
    }
    async findOne(ctx, { id }) {
        const playlist = await this.playlist.findById(+id);
        if (!playlist) {
            return new core_1.HttpResponseNotFound();
        }
        return new core_1.HttpResponseOK(playlist);
    }
    async add(ctx) {
        const playlist = ctx.request.body;
        await this.playlist.create(Object.assign({ user: ctx.user }, playlist));
        return new core_1.HttpResponseOK(playlist);
    }
    async opt() { return new core_1.HttpResponseOK(); }
    async update(ctx, { id }, body) {
        await this.playlist.update({ id, user: ctx.user }, body);
        return new core_1.HttpResponseOK();
    }
    async optById() { return new core_1.HttpResponseOK(); }
}
__decorate([
    core_1.dependency,
    __metadata("design:type", typeof (_a = typeof playlist_pkg_1.Playlist !== "undefined" && playlist_pkg_1.Playlist) === "function" ? _a : Object)
], PlaylistController.prototype, "playlist", void 0);
__decorate([
    core_1.Get('/'),
    core_1.ApiResponse(200, {
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
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "find", null);
__decorate([
    core_1.Get('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context, Object]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "findOne", null);
__decorate([
    core_1.Post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "add", null);
__decorate([
    core_1.Options('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "opt", null);
__decorate([
    core_1.Patch('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context, Object, typeof (_b = typeof playlist_pkg_1.UpdateOptions !== "undefined" && playlist_pkg_1.UpdateOptions) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "update", null);
__decorate([
    core_1.Options('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "optById", null);
exports.PlaylistController = PlaylistController;
//# sourceMappingURL=playlist.controller.js.map