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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistController = void 0;
const core_1 = require("@foal/core");
const playlist_pkg_1 = require("playlist-pkg");
let PlaylistController = class PlaylistController {
    async find(ctx) {
        const playlists = await this.playlist.findMany();
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
        await this.playlist.create(playlist);
        return new core_1.HttpResponseOK(playlist);
    }
    async opt() { return new core_1.HttpResponseOK(); }
    async update(ctx, { id }, body) {
        await this.playlist.update(id, body);
        return new core_1.HttpResponseOK();
    }
    async optById() { return new core_1.HttpResponseOK(); }
};
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
    __metadata("design:paramtypes", [typeof (_b = typeof core_1.Context !== "undefined" && core_1.Context) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PlaylistController.prototype, "find", null);
__decorate([
    core_1.Get('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof core_1.Context !== "undefined" && core_1.Context) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PlaylistController.prototype, "findOne", null);
__decorate([
    core_1.Post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof core_1.Context !== "undefined" && core_1.Context) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PlaylistController.prototype, "add", null);
__decorate([
    core_1.Options('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], PlaylistController.prototype, "opt", null);
__decorate([
    core_1.Patch('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof core_1.Context !== "undefined" && core_1.Context) === "function" ? _j : Object, Object, typeof (_k = typeof playlist_pkg_1.UpdateOptions !== "undefined" && playlist_pkg_1.UpdateOptions) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], PlaylistController.prototype, "update", null);
__decorate([
    core_1.Options('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], PlaylistController.prototype, "optById", null);
PlaylistController = __decorate([
    core_1.Log('PlaylistController', { body: true, params: true, query: true })
], PlaylistController);
exports.PlaylistController = PlaylistController;
//# sourceMappingURL=playlist.controller.js.map