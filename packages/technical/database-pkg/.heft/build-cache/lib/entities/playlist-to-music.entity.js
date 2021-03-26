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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistToMusicEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const music_entity_1 = require("./music.entity");
const playlist_entity_1 = require("./playlist.entity");
let PlaylistToMusicEntity = class PlaylistToMusicEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.ManyToOne(() => playlist_entity_1.PlaylistEntity, playlist => playlist.playlistToMusics, { onDelete: 'CASCADE' }),
    __metadata("design:type", playlist_entity_1.PlaylistEntity)
], PlaylistToMusicEntity.prototype, "playlist", void 0);
__decorate([
    typeorm_1.ManyToOne(() => music_entity_1.MusicEntity, music => music.playlistToMusics, { onDelete: 'CASCADE' }),
    __metadata("design:type", music_entity_1.MusicEntity)
], PlaylistToMusicEntity.prototype, "music", void 0);
__decorate([
    typeorm_1.Column('int', { unsigned: true }),
    __metadata("design:type", Number)
], PlaylistToMusicEntity.prototype, "order", void 0);
PlaylistToMusicEntity = __decorate([
    typeorm_1.Entity({ name: 'playlist_to_musics' })
], PlaylistToMusicEntity);
exports.PlaylistToMusicEntity = PlaylistToMusicEntity;
//# sourceMappingURL=playlist-to-music.entity.js.map